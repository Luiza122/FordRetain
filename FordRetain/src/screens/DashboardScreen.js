import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MetricCard from '../components/MetricCard';
import PrimaryButton from '../components/PrimaryButton';
import mockDashboard from '../data/mockDashboard';
import colors from '../styles/colors';

export default function DashboardScreen({ navigation }) {
  const { vinShareGeral, totalClientes, clientesAltoRisco, agendamentosRecomendados, vinSharePorRegiao, vinSharePorModelo } = mockDashboard;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FordRetain — Dashboard Executivo</Text>

      <MetricCard title="VIN Share geral" value={`${vinShareGeral}%`} description="Percentual atual de permanência na rede oficial." />
      <MetricCard title="Clientes monitorados" value={String(totalClientes)} description="Base ativa de clientes acompanhados no ciclo de pós-venda." />
      <MetricCard title="Clientes em alto risco" value={String(clientesAltoRisco)} description="Clientes que exigem ação de retenção imediata." />
      <MetricCard title="Agendamentos recomendados" value={String(agendamentosRecomendados)} description="Ações sugeridas com maior potencial de impacto." />

      <Text style={styles.section}>VIN Share por região</Text>
      {vinSharePorRegiao.map((item) => <MetricCard key={item.regiao} title={item.regiao} value={`${item.valor}%`} />)}

      <Text style={styles.section}>VIN Share por modelo</Text>
      {vinSharePorModelo.map((item) => <MetricCard key={item.modelo} title={item.modelo} value={`${item.valor}%`} />)}

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
  title: { fontSize: 22, fontWeight: '700', color: colors.primaryDark, marginBottom: 10 },
  section: { marginTop: 10, marginBottom: 8, fontSize: 16, fontWeight: '700', color: '#0F172A' },
  actions: { marginTop: 8, gap: 10, marginBottom: 18 },
});
