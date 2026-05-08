import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import mockClients from '../data/mockClients';
import colors from '../styles/colors';

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

export default function DashboardScreen({ navigation }) {
  const total = mockClients.length;
  const alto = mockClients.filter((c) => c.riscoEvasao >= 70).length;
  const medio = mockClients.filter((c) => c.riscoEvasao >= 50 && c.riscoEvasao < 70).length;
  const baixo = mockClients.filter((c) => c.riscoEvasao < 50).length;
  const fieis = mockClients.filter((c) => c.perfil === 'Cliente Fiel').length;
  const garantiaVencida = mockClients.filter((c) => c.garantiaStatus === 'Vencida').length;
  const riscoMedio = mockClients.reduce((acc, c) => acc + c.riscoEvasao, 0) / total;
  const vinShareEstimado = 100 - riscoMedio * 0.65;
  const recuperacao = mockClients.filter((c) => c.riscoEvasao >= 60 && c.riscoEvasao < 85).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard Executivo FordRetain</Text>
      <Text style={styles.subtitle}>Monitoramento analítico da retenção preditiva, risco de evasão e potencial de recuperação.</Text>

      <View style={styles.grid}>
        <IndicatorCard title="Total de clientes analisados" value={String(total)} description="Base consolidada para inteligência comercial." />
        <IndicatorCard title="Clientes em alto risco" value={String(alto)} description="Probabilidade de evasão acima de 70%." tone="danger" />
        <IndicatorCard title="Clientes em risco médio" value={String(medio)} description="Necessitam estímulos de retenção no curto prazo." tone="warning" />
        <IndicatorCard title="Clientes em baixo risco" value={String(baixo)} description="Relacionamento saudável e recorrente." tone="success" />
        <IndicatorCard title="VIN Share estimado" value={`${vinShareEstimado.toFixed(1)}%`} description="Estimativa acadêmica com base no risco agregado." />
        <IndicatorCard title="Risco médio de evasão" value={`${riscoMedio.toFixed(1)}%`} description="Indicador macro de saúde da carteira." tone="warning" />
        <IndicatorCard title="Clientes com garantia vencida" value={String(garantiaVencida)} description="Segmento com maior sensibilidade a perda de vínculo." tone="danger" />
        <IndicatorCard title="Clientes fiéis" value={String(fieis)} description="Público estratégico para programas de fidelidade." tone="success" />
        <IndicatorCard title="Alto potencial de recuperação" value={String(recuperacao)} description="Clientes com resposta provável a ações preventivas." tone="warning" />
        <IndicatorCard title="Campanhas recomendadas" value="3" description="Portfólio prioritário ativo no módulo de recomendações." />
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Resumo executivo</Text>
        <Text style={styles.text}>A base analisada indica concentração de clientes com garantia vencida e risco elevado de evasão. A prioridade comercial deve ser o contato preventivo e campanhas de revisão para preservar recorrência de serviços e ampliar o VIN Share projetado.</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Próximas ações</Text>
        <Text style={styles.text}>• Priorizar clientes com risco acima de 70% em até 24 horas.</Text>
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
  title: { fontSize: 28, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray, marginBottom: 12 },
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
  sectionTitle: { fontWeight: '800', color: colors.fordBlue, marginBottom: 6 },
  text: { color: '#334155', lineHeight: 21 },
});
