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
  const riscoMedio = (mockClients.reduce((acc, c) => acc + c.riscoEvasao, 0) / total).toFixed(1);
  const altoPotencial = mockClients.filter((c) => c.riscoEvasao >= 65 && c.riscoEvasao <= 85).length;
  const vinShare = (100 - Number(riscoMedio)).toFixed(1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard Executivo</Text>
      <MetricCard title="Total de clientes analisados" value={String(total)} description="Base monitorada no ciclo atual." />
      <MetricCard title="Clientes em risco" value={String(emRisco)} description="Prioridade para atuação imediata." />
      <MetricCard title="VIN Share estimado" value={`${vinShare}%`} description="Estimativa baseada no risco médio da carteira." />
      <MetricCard title="Clientes fiéis" value={String(fieis)} description="Clientes com alta recorrência na rede." />
      <MetricCard title="Garantia vencida" value={String(garantiaVencida)} description="Grupo mais suscetível à evasão." />
      <MetricCard title="Risco médio de evasão" value={`${riscoMedio}%`} description="Indicador consolidado da carteira." />
      <MetricCard title="Alto potencial de recuperação" value={String(altoPotencial)} description="Clientes que tendem a retornar com oferta adequada." />

      <View style={styles.box}><Text style={styles.boxTitle}>Resumo executivo</Text><Text style={styles.boxText}>O cenário indica pressão após garantia e oportunidade clara de recuperação com ações segmentadas por perfil.</Text></View>
      <View style={styles.box}><Text style={styles.boxTitle}>Próximos passos</Text><Text style={styles.boxText}>1) Priorizar clientes com risco acima de 70%.
2) Disparar campanhas por perfil.
3) Reavaliar VIN Share após 30 dias.</Text></View>

      <PrimaryButton title="Clientes" onPress={() => navigation.navigate('Clients')} />
      <PrimaryButton title="Recomendações" onPress={() => navigation.navigate('Recommendations')} />
      <PrimaryButton title="Voltar para Home" variant="secondary" onPress={() => navigation.navigate('Home')} />
    </ScrollView>
  );
}
const styles=StyleSheet.create({container:{padding:16,backgroundColor:colors.background,flexGrow:1},title:{fontSize:24,fontWeight:'800',color:colors.navy,marginBottom:12},box:{backgroundColor:'#EEF5FF',borderWidth:1,borderColor:'#CFE0F7',padding:12,borderRadius:12,marginVertical:8},boxTitle:{fontWeight:'700',color:colors.navy,marginBottom:4},boxText:{color:'#334155',lineHeight:20}});
