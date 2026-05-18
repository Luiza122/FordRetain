import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';
import { getDashboard, getApiHealth } from '../services/api';

function IndicatorCard({ title, value, description, tone = 'neutral' }) {
  const toneStyle = tone === 'danger' ? styles.danger : tone === 'warning' ? styles.warning : tone === 'success' ? styles.success : styles.neutral;
  return (
    <View style={[styles.metricCard, toneStyle]}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricDescription}>{description}</Text>
    </View>
  );
}

function SimpleBarChart({ title, data, suffix = '' }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {data.map((item) => (
        <View key={item.label} style={styles.chartRow}>
          <Text style={styles.chartLabel}>{item.label}</Text>
          <View style={styles.chartTrack}>
            <View style={[styles.chartFill, { width: `${Math.max(8, (item.value / maxValue) * 100)}%` }]} />
          </View>
          <Text style={styles.chartValue}>{item.value}{suffix}</Text>
        </View>
      ))}
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.fordBlue} />
        <Text style={styles.loadingText}>Carregando dados da API FordRetain...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard Executivo FordRetain</Text>
      <Text style={styles.subtitle}>Monitoramento analítico da retenção preditiva, risco de evasão e potencial de recuperação.</Text>

      <View style={styles.apiBox}>
        <Text style={styles.apiTitle}>Integração assíncrona</Text>
        <Text style={styles.apiText}>{apiInfo.message}</Text>
        <Text style={styles.apiText}>Endpoints simulados: {apiInfo.endpoints.join(' • ')}</Text>
      </View>

      <View style={styles.grid}>
        <IndicatorCard title="Total de clientes analisados" value={String(dashboard.total)} description="Base consolidada para inteligência comercial." />
        <IndicatorCard title="Clientes em alto risco" value={String(dashboard.highRisk)} description="Probabilidade de evasão acima de 75%." tone="danger" />
        <IndicatorCard title="Clientes em risco médio" value={String(dashboard.mediumRisk)} description="Necessitam estímulos de retenção no curto prazo." tone="warning" />
        <IndicatorCard title="Clientes em baixo risco" value={String(dashboard.lowRisk)} description="Relacionamento saudável e recorrente." tone="success" />
        <IndicatorCard title="VIN Share estimado" value={`${dashboard.vinShareEstimado}%`} description="Estimativa acadêmica com base no risco agregado." />
        <IndicatorCard title="Risco médio de evasão" value={`${dashboard.riscoMedio}%`} description="Indicador macro de saúde da carteira." tone="warning" />
        <IndicatorCard title="Clientes com garantia vencida" value={String(dashboard.garantiaVencida)} description="Segmento sensível à perda de vínculo." tone="danger" />
        <IndicatorCard title="Campanhas recomendadas" value={String(dashboard.campanhasRecomendadas)} description="Ações ativas no módulo de recomendações." />
      </View>

      <SimpleBarChart title="VIN Share estimado por região" data={dashboard.vinSharePorRegiao} suffix="%" />
      <SimpleBarChart title="Clientes por nível de risco" data={dashboard.riscoPorNivel} />
      <SimpleBarChart title="Distribuição por perfil de clustering" data={dashboard.clientesPorPerfil} />

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Resumo executivo</Text>
        <Text style={styles.text}>A base analisada indica concentração de clientes com garantia vencida e risco elevado de evasão. A prioridade comercial deve ser o contato preventivo e campanhas de revisão para preservar recorrência de serviços e ampliar o VIN Share projetado.</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Próximas ações</Text>
        <Text style={styles.text}>• Priorizar clientes com risco acima de 75% em até 24 horas.</Text>
        <Text style={styles.text}>• Executar campanha de contato preventivo por telefone e CRM.</Text>
        <Text style={styles.text}>• Acompanhar clientes com garantia vencida com oferta segmentada.</Text>
        <Text style={styles.text}>• Revisar semanalmente a evolução do VIN Share e taxa de retorno.</Text>
      </View>

      <PrimaryButton title="Ver clientes em risco" onPress={() => navigation.navigate('Clients')} />
      <PrimaryButton title="Ver recomendações" onPress={() => navigation.navigate('Recommendations')} />
      <PrimaryButton title="Simular classificação" onPress={() => navigation.navigate('Prediction')} />
      <PrimaryButton title="Ver perfis de clustering" onPress={() => navigation.navigate('Profiles')} />
      <PrimaryButton title="Voltar para Home" variant="secondary" onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 18 },
  loadingText: { marginTop: 10, color: colors.textGray, fontWeight: '600', textAlign: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray, marginBottom: 12 },
  apiBox: { backgroundColor: colors.lightBlue, borderColor: '#BFDBFE', borderWidth: 1, borderRadius: 14, padding: 12, marginBottom: 12 },
  apiTitle: { color: colors.navy, fontWeight: '800', marginBottom: 4 },
  apiText: { color: '#334155', lineHeight: 20 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  metricCard: { width: '48.5%', borderRadius: 14, borderWidth: 1, padding: 12, marginBottom: 10, backgroundColor: colors.white },
  metricTitle: { fontWeight: '700', color: '#334155', fontSize: 12 },
  metricValue: { color: colors.navy, fontWeight: '800', fontSize: 24, marginVertical: 6 },
  metricDescription: { color: '#64748B', fontSize: 12 },
  neutral: { borderColor: colors.border },
  danger: { borderColor: '#FCA5A5', backgroundColor: '#FEF2F2' },
  warning: { borderColor: '#FCD34D', backgroundColor: '#FFFBEB' },
  success: { borderColor: '#86EFAC', backgroundColor: '#F0FDF4' },
  sectionCard: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 12, marginTop: 8, marginBottom: 4 },
  sectionTitle: { fontWeight: '800', color: colors.fordBlue, marginBottom: 8 },
  text: { color: '#334155', lineHeight: 21 },
  chartRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 9 },
  chartLabel: { width: 96, color: colors.navy, fontWeight: '700', fontSize: 12 },
  chartTrack: { flex: 1, height: 12, backgroundColor: '#E2E8F0', borderRadius: 999, overflow: 'hidden' },
  chartFill: { height: 12, backgroundColor: colors.fordBlue, borderRadius: 999 },
  chartValue: { width: 44, textAlign: 'right', color: '#334155', fontWeight: '700', fontSize: 12 },
});
