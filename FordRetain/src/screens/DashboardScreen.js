import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import RoleGuard from '../components/RoleGuard';
import AppLogo from '../components/AppLogo';
import colors from '../styles/colors';
import { getDashboard, getApiHealth } from '../services/api';
import { logoutMockUser } from '../data/mockAuth';

function MetricCard({ title, value, description, tone = 'blue' }) {
  const toneStyle = styles[`metric_${tone}`] || styles.metric_blue;
  return (
    <View style={[styles.metricCard, toneStyle]}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDescription}>{description}</Text>
    </View>
  );
}

function BarChart({ title, data, suffix = '' }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);
  return (
    <View style={styles.chartCard}>
      <Text style={styles.chartTitle}>{title}</Text>
      {data.map((item) => (
        <View key={item.label} style={styles.chartItem}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartLabel}>{item.label}</Text>
            <Text style={styles.chartValue}>{item.value}{suffix}</Text>
          </View>
          <View style={styles.chartTrack}>
            <View style={[styles.chartFill, { width: `${Math.max(10, (item.value / maxValue) * 100)}%` }]} />
          </View>
        </View>
      ))}
    </View>
  );
}

function DonutSummary({ highRisk, mediumRisk, lowRisk }) {
  const total = highRisk + mediumRisk + lowRisk || 1;
  const highPercent = Math.round((highRisk / total) * 100);
  return (
    <View style={styles.donutCard}>
      <View style={styles.donutCircle}>
        <Text style={styles.donutValue}>{highPercent}%</Text>
        <Text style={styles.donutLabel}>alto risco</Text>
      </View>
      <View style={styles.legendBox}>
        <Text style={styles.legendTitle}>Composição da carteira</Text>
        <Text style={styles.legendText}>Alto risco: {highRisk} clientes</Text>
        <Text style={styles.legendText}>Risco médio: {mediumRisk} clientes</Text>
        <Text style={styles.legendText}>Baixo risco: {lowRisk} clientes</Text>
      </View>
    </View>
  );
}

export default function DashboardScreen({ navigation }) {
  const [dashboard, setDashboard] = useState(null);
  const [apiInfo, setApiInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [dashboardData, healthData] = await Promise.all([getDashboard(), getApiHealth()]);
        setDashboard(dashboardData);
        setApiInfo(healthData);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  function handleLogout() {
    logoutMockUser();
    navigation.replace('Login');
  }

  return (
    <RoleGuard navigation={navigation} allowedProfiles={['Gerente']} message="O dashboard executivo é exclusivo para o perfil Gerente.">
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.fordBlue} />
          <Text style={styles.loadingText}>Carregando indicadores FordRetain...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.hero}>
            <View style={styles.logoWrapper}>
              <AppLogo small />
            </View>
            <View style={styles.heroTop}>
              <View style={styles.heroTextBlock}>
                <Text style={styles.eyebrow}>Painel executivo</Text>
                <Text style={styles.title}>FordRetain</Text>
                <Text style={styles.subtitle}>Retenção preditiva e inteligência de VIN Share.</Text>
              </View>
              <View style={styles.statusPill}>
                <Text style={styles.statusDot}>●</Text>
                <Text style={styles.statusText}>API online</Text>
              </View>
            </View>
            <View style={styles.heroStats}>
              <View>
                <Text style={styles.heroNumber}>{dashboard.vinShareEstimado}%</Text>
                <Text style={styles.heroLabel}>VIN Share estimado</Text>
              </View>
              <View style={styles.heroDivider} />
              <View>
                <Text style={styles.heroNumber}>{dashboard.riscoMedio}%</Text>
                <Text style={styles.heroLabel}>risco médio</Text>
              </View>
            </View>
          </View>

          <View style={styles.apiBox}>
            <Text style={styles.apiTitle}>Integração assíncrona ativa</Text>
            <Text style={styles.apiText}>{apiInfo.message}</Text>
            <Text style={styles.apiBadge}>{apiInfo.endpoints.join('  •  ')}</Text>
          </View>

          <View style={styles.grid}>
            <MetricCard title="Clientes analisados" value={String(dashboard.total)} description="Base consolidada" tone="blue" />
            <MetricCard title="Alto risco" value={String(dashboard.highRisk)} description="Contato prioritário" tone="red" />
            <MetricCard title="Risco médio" value={String(dashboard.mediumRisk)} description="Acompanhar semana" tone="yellow" />
            <MetricCard title="Baixo risco" value={String(dashboard.lowRisk)} description="Carteira saudável" tone="green" />
            <MetricCard title="Garantia vencida" value={String(dashboard.garantiaVencida)} description="Atenção comercial" tone="purple" />
            <MetricCard title="Campanhas" value={String(dashboard.campanhasRecomendadas)} description="Ações sugeridas" tone="blue" />
          </View>

          <DonutSummary highRisk={dashboard.highRisk} mediumRisk={dashboard.mediumRisk} lowRisk={dashboard.lowRisk} />
          <BarChart title="VIN Share estimado por região" data={dashboard.vinSharePorRegiao} suffix="%" />
          <BarChart title="Clientes por nível de risco" data={dashboard.riscoPorNivel} />
          <BarChart title="Distribuição por perfil de clustering" data={dashboard.clientesPorPerfil} />

          <View style={styles.insightCard}>
            <Text style={styles.insightTitle}>Resumo executivo</Text>
            <Text style={styles.insightText}>A carteira apresenta clientes com risco relevante de evasão. A prioridade é acionar clientes críticos, reforçar campanhas de revisão e acompanhar semanalmente a evolução do VIN Share.</Text>
          </View>

          <View style={styles.actionPanel}>
            <Text style={styles.actionTitle}>Ações rápidas</Text>
            <PrimaryButton title="Ver clientes em risco" onPress={() => navigation.navigate('Clients')} />
            <PrimaryButton title="Ver recomendações" onPress={() => navigation.navigate('Recommendations')} />
            <PrimaryButton title="Simular classificação" onPress={() => navigation.navigate('Prediction')} />
            <PrimaryButton title="Ver perfis de clustering" onPress={() => navigation.navigate('Profiles')} />
            <PrimaryButton title="Voltar para Home" variant="secondary" onPress={() => navigation.navigate('Home')} />
            <PrimaryButton title="Sair e voltar ao Login" variant="secondary" onPress={handleLogout} />
          </View>
        </ScrollView>
      )}
    </RoleGuard>
  );
}

const cardShadow = {
  shadowColor: colors.shadow,
  shadowOpacity: 0.08,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 8 },
  elevation: 3,
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1, paddingBottom: 28 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 18 },
  loadingText: { marginTop: 10, color: colors.textGray, fontWeight: '700', textAlign: 'center' },
  hero: { backgroundColor: colors.navy, borderRadius: 30, padding: 20, marginBottom: 14, ...cardShadow },
  logoWrapper: { marginBottom: 14, alignItems: 'center' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 },
  heroTextBlock: { flex: 1 },
  eyebrow: { color: '#9CC5FF', fontWeight: '800', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1.2 },
  title: { fontSize: 34, fontWeight: '900', color: colors.white, marginTop: 4 },
  subtitle: { color: '#DCEBFF', marginTop: 4, lineHeight: 20 },
  statusPill: { backgroundColor: 'rgba(255,255,255,0.12)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.22)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 },
  statusDot: { color: '#22C55E', fontSize: 10 },
  statusText: { color: colors.white, fontWeight: '800', fontSize: 12 },
  heroStats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 22, padding: 14 },
  heroNumber: { color: colors.white, fontSize: 28, fontWeight: '900' },
  heroLabel: { color: '#BFDBFE', fontWeight: '700', marginTop: 2 },
  heroDivider: { width: 1, height: 48, backgroundColor: 'rgba(255,255,255,0.25)' },
  apiBox: { backgroundColor: colors.surface, borderColor: colors.borderSoft, borderWidth: 1, borderRadius: 22, padding: 15, marginBottom: 12, ...cardShadow },
  apiTitle: { color: colors.navy, fontWeight: '900', marginBottom: 5, fontSize: 15 },
  apiText: { color: colors.textGray, lineHeight: 20 },
  apiBadge: { color: colors.fordBlue, fontWeight: '800', marginTop: 8, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  metricCard: { width: '48%', borderRadius: 22, borderWidth: 1, padding: 14, marginBottom: 2, backgroundColor: colors.surface, ...cardShadow },
  metricTitle: { fontWeight: '800', color: colors.textGray, fontSize: 12 },
  metricValue: { color: colors.navy, fontWeight: '900', fontSize: 28, marginVertical: 6 },
  metricDescription: { color: colors.muted, fontSize: 12, fontWeight: '600' },
  metric_blue: { borderColor: '#CFE0FF', backgroundColor: colors.surface },
  metric_red: { borderColor: '#FFC9CE', backgroundColor: colors.riskRedSoft },
  metric_yellow: { borderColor: '#FDE1A8', backgroundColor: colors.warningSoft },
  metric_green: { borderColor: '#BBF7D0', backgroundColor: colors.successSoft },
  metric_purple: { borderColor: '#E9D5FF', backgroundColor: colors.purpleSoft },
  donutCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 24, borderWidth: 1, borderColor: colors.borderSoft, padding: 16, marginTop: 12, gap: 16, ...cardShadow },
  donutCircle: { width: 112, height: 112, borderRadius: 56, borderWidth: 14, borderColor: colors.riskRed, backgroundColor: colors.riskRedSoft, alignItems: 'center', justifyContent: 'center' },
  donutValue: { color: colors.navy, fontWeight: '900', fontSize: 26 },
  donutLabel: { color: colors.textGray, fontSize: 11, fontWeight: '800' },
  legendBox: { flex: 1 },
  legendTitle: { color: colors.navy, fontWeight: '900', fontSize: 16, marginBottom: 6 },
  legendText: { color: colors.textGray, lineHeight: 22, fontWeight: '600' },
  chartCard: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft, borderRadius: 24, padding: 16, marginTop: 12, ...cardShadow },
  chartTitle: { fontWeight: '900', color: colors.navy, marginBottom: 12, fontSize: 16 },
  chartItem: { marginBottom: 12 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  chartLabel: { color: colors.textDark, fontWeight: '800', fontSize: 12, flex: 1, marginRight: 8 },
  chartTrack: { height: 12, backgroundColor: '#E8EEF7', borderRadius: 999, overflow: 'hidden' },
  chartFill: { height: 12, backgroundColor: colors.fordBlue, borderRadius: 999 },
  chartValue: { color: colors.fordBlue, fontWeight: '900', fontSize: 12 },
  insightCard: { backgroundColor: colors.navy, borderRadius: 24, padding: 16, marginTop: 12, ...cardShadow },
  insightTitle: { color: colors.white, fontWeight: '900', fontSize: 17, marginBottom: 6 },
  insightText: { color: '#DCEBFF', lineHeight: 22, fontWeight: '600' },
  actionPanel: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.borderSoft, borderRadius: 24, padding: 14, marginTop: 12, ...cardShadow },
  actionTitle: { color: colors.navy, fontWeight: '900', fontSize: 17, marginBottom: 6 },
});
