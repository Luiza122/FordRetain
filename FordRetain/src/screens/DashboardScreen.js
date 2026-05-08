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
  const riscoMedio = mockClients.reduce((acc, c) => acc + c.riscoEvasao, 0) / total;
  const vinShareEstimado = 100 - riscoMedio * 0.65;
  const recuperacao = mockClients.filter((c) => c.riscoEvasao >= 60 && c.riscoEvasao < 85).length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard Executivo</Text>
      <Text style={styles.subtitle}>Monitoramento preditivo de retenção e risco de evasão.</Text>

      <MetricCard title="Total de clientes analisados" value={String(total)} description="Base tratada para priorização comercial." />
      <MetricCard title="Clientes em risco" value={String(emRisco)} description="Risco de evasão acima de 70%." />
      <MetricCard title="VIN Share estimado" value={`${vinShareEstimado.toFixed(1)}%`} description="Estimativa acadêmica baseada no risco agregado." />
      <MetricCard title="Clientes fiéis" value={String(fieis)} description="Alta recorrência na rede autorizada." />
      <MetricCard title="Clientes com garantia vencida" value={String(garantiaVencida)} description="Público crítico para campanhas de retenção." />
      <MetricCard title="Risco médio de evasão" value={`${riscoMedio.toFixed(1)}%`} description="Saúde geral da carteira de pós-venda." />
      <MetricCard title="Alto potencial de recuperação" value={String(recuperacao)} description="Clientes com chance real de retorno por ação rápida." />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Resumo executivo</Text>
        <Text style={styles.text}>
          O FordRetain permite agir antes da perda do cliente, elevando previsibilidade de receita, taxa de retorno à
          oficina e continuidade do relacionamento com a marca Ford.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximos passos recomendados</Text>
        <Text style={styles.text}>• Priorizar contato com risco alto nas próximas 24h.</Text>
        <Text style={styles.text}>• Rodar campanha por perfil comportamental.</Text>
        <Text style={styles.text}>• Medir impacto em agendamentos e VIN Share mensal.</Text>
      </View>

      <PrimaryButton title="Clientes" onPress={() => navigation.navigate('Clients')} />
      <PrimaryButton title="Recomendações" onPress={() => navigation.navigate('Recommendations')} />
      <PrimaryButton title="Classificação" onPress={() => navigation.navigate('Prediction')} />
      <PrimaryButton title="Clustering" onPress={() => navigation.navigate('Profiles')} />
      <PrimaryButton title="Home" variant="secondary" onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 28, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray, marginBottom: 10 },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 12, marginTop: 8 },
  cardTitle: { fontWeight: '800', color: colors.fordBlue, marginBottom: 4 },
  text: { color: '#334155', lineHeight: 20 },
});
