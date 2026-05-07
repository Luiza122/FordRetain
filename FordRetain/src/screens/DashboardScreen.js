import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MetricCard from '../components/MetricCard';
import mockDashboard from '../data/mockDashboard';

export default function DashboardScreen({ navigation }) {
  const {
    vinShareGeral,
    totalClientes,
    clientesAltoRisco,
    agendamentosRecomendados,
    vinSharePorRegiao,
    vinSharePorModelo,
  } = mockDashboard;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard VIN Share</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>KPIs</Text>
      <MetricCard title="VIN Share Geral" value={`${(vinShareGeral * 100).toFixed(1)}%`} />
      <MetricCard title="Total de Clientes" value={String(totalClientes)} />
      <MetricCard title="Clientes Alto Risco" value={String(clientesAltoRisco)} />
      <MetricCard
        title="Agendamentos Recomendados"
        value={String(agendamentosRecomendados)}
      />

      <Text style={styles.sectionTitle}>VIN Share por região</Text>
      {Object.entries(vinSharePorRegiao).map(([regiao, valor]) => (
        <MetricCard
          key={regiao}
          title={regiao}
          value={`${(valor * 100).toFixed(1)}%`}
        />
      ))}

      <Text style={styles.sectionTitle}>VIN Share por modelo</Text>
      {Object.entries(vinSharePorModelo).map(([modelo, valor]) => (
        <MetricCard
          key={modelo}
          title={modelo}
          value={`${(valor * 100).toFixed(1)}%`}
        />
      ))}

      <View style={styles.actions}>
        {[
          { label: 'RiskClients', route: 'RiskClients' },
          { label: 'Prediction', route: 'Prediction' },
          { label: 'Profiles', route: 'Profiles' },
          { label: 'Security', route: 'Security' },
          { label: 'About', route: 'About' },
        ].map(({ label, route }) => (
          <TouchableOpacity
            key={route}
            style={styles.button}
            onPress={() => navigation.navigate(route)}
          >
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutBtn: {
    padding: 8,
  },
  logoutText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 14,
    marginBottom: 8,
    color: '#0f172a',
  },
  actions: {
    marginTop: 14,
    marginBottom: 10,
    gap: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
