import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MetricCard from '../components/MetricCard';
import PrimaryButton from '../components/PrimaryButton';
import mockDashboard from '../data/mockDashboard';
import colors from '../styles/colors';

export default function DashboardScreen({ navigation }) {
  const {
    vinShareGeral,
    clientesMonitorados,
    clientesAltoRisco,
    agendamentosRecomendados,
    vinSharePorRegiao,
    vinSharePorModelo,
    alertas,
  } = mockDashboard;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FordRetain — Dashboard Executivo</Text>

      <MetricCard title="VIN Share geral" value={`${vinShareGeral}%`} description="Percentual de retenção na rede oficial Ford." />
      <MetricCard title="Clientes monitorados" value={String(clientesMonitorados)} description="Carteira ativa acompanhada por sinais preditivos." />
      <MetricCard title="Clientes em alto risco" value={String(clientesAltoRisco)} description="Prioridade para atuação imediata de retenção." />
      <MetricCard title="Agendamentos recomendados" value={String(agendamentosRecomendados)} description="Ações de pós-venda sugeridas para recuperação." />

      <Text style={styles.section}>VIN Share por região</Text>
      {vinSharePorRegiao.map((item) => <MetricCard key={item.regiao} title={item.regiao} value={`${item.valor}%`} />)}

      <Text style={styles.section}>VIN Share por modelo</Text>
      {vinSharePorModelo.map((item) => <MetricCard key={item.modelo} title={item.modelo} value={`${item.valor}%`} />)}

      <Text style={styles.section}>Alertas estratégicos</Text>
      {alertas.map((alerta) => (
        <View key={alerta} style={styles.alertCard}>
          <Text style={styles.alertText}>{alerta}</Text>
        </View>
      ))}

      <Text style={styles.section}>Menu FordRetain</Text>
      <View style={styles.actions}>
        <PrimaryButton title="Clientes em risco" onPress={() => navigation.navigate('RiskClients')} />
        <PrimaryButton title="Predição de cliente" onPress={() => navigation.navigate('Prediction')} />
        <PrimaryButton title="Perfis de comportamento" onPress={() => navigation.navigate('Profiles')} />
        <PrimaryButton title="Segurança e privacidade" onPress={() => navigation.navigate('Security')} />
        <PrimaryButton title="Sobre o projeto" onPress={() => navigation.navigate('About')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F8FAFC', flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', color: colors.primaryDark, marginBottom: 12 },
  section: { marginTop: 10, marginBottom: 8, fontSize: 16, fontWeight: '700', color: '#0F172A' },
  alertCard: { backgroundColor: '#FFF7ED', borderColor: '#FDBA74', borderWidth: 1, borderRadius: 10, padding: 10, marginBottom: 8 },
  alertText: { color: '#9A3412', fontWeight: '600' },
  actions: { marginVertical: 10, gap: 10, marginBottom: 24 },
});
