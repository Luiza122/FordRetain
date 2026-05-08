import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MetricCard from '../components/MetricCard';
import PrimaryButton from '../components/PrimaryButton';
import mockClients from '../data/mockClients';
import colors from '../styles/colors';

export default function DashboardScreen({ navigation }) {
  const total = mockClients.length;
  const emRisco = mockClients.filter((c) => c.riscoEvasao >= 70).length;
  const fieis = mockClients.filter((c) => c.perfil === 'Cliente Fiel').length;
  const garantiaVencida = mockClients.filter((c) => c.garantiaStatus === 'Vencida').length;
  const vinShareEstimado = (100 - mockClients.reduce((acc, c) => acc + c.riscoEvasao, 0) / total).toFixed(1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard FordRetain</Text>
      <MetricCard title="Total de clientes analisados" value={String(total)} />
      <MetricCard title="Clientes em risco" value={String(emRisco)} />
      <MetricCard title="VIN Share estimado" value={`${vinShareEstimado}%`} />
      <MetricCard title="Clientes fiéis" value={String(fieis)} />
      <MetricCard title="Clientes com garantia vencida" value={String(garantiaVencida)} />

      <Text style={styles.section}>Navegação</Text>
      <View style={styles.actions}>
        <PrimaryButton title="Tela inicial" variant="secondary" onPress={() => navigation.navigate('Home')} />
        <PrimaryButton title="Clientes" onPress={() => navigation.navigate('Clients')} />
        <PrimaryButton title="Recomendações" onPress={() => navigation.navigate('Recommendations')} />
        <PrimaryButton title="Classificação preditiva" onPress={() => navigation.navigate('Prediction')} />
        <PrimaryButton title="Perfis de clustering" onPress={() => navigation.navigate('Profiles')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', color: colors.navy, marginBottom: 12 },
  section: { marginTop: 12, marginBottom: 8, fontSize: 16, fontWeight: '700', color: '#0F172A' },
  actions: { gap: 10, marginBottom: 24 },
});
