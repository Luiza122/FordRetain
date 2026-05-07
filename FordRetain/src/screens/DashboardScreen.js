import { ScrollView, StyleSheet, Text, View } from 'react-native';
import MetricCard from '../components/MetricCard';
import PrimaryButton from '../components/PrimaryButton';
import mockDashboard from '../data/mockDashboard';
import globalStyles from '../styles/globalStyles';

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.container}>
      <Text style={globalStyles.title}>FordRetain — Dashboard Executivo</Text>
      <Text style={globalStyles.subtitle}>Visão de retenção e VIN Share da rede.</Text>
      <View style={styles.grid}><MetricCard label='VIN Share geral' value={mockDashboard.vinShareGeral}/><MetricCard label='Clientes monitorados' value={mockDashboard.clientesMonitorados}/><MetricCard label='Clientes em alto risco' value={mockDashboard.clientesAltoRisco}/><MetricCard label='Agendamentos recomendados' value={mockDashboard.agendamentosRecomendados}/></View>
      <View style={globalStyles.card}><Text style={styles.section}>VIN Share por região</Text>{mockDashboard.vinSharePorRegiao.map(i=><Text key={i.regiao}>• {i.regiao}: {i.valor}</Text>)}</View>
      <View style={globalStyles.card}><Text style={styles.section}>VIN Share por modelo</Text>{mockDashboard.vinSharePorModelo.map(i=><Text key={i.modelo}>• {i.modelo}: {i.valor}</Text>)}</View>
      <View style={globalStyles.card}><Text style={styles.section}>Alertas estratégicos</Text>{mockDashboard.alertas.map((a,idx)=><Text key={idx}>• {a}</Text>)}</View>
      <View style={globalStyles.card}><Text style={styles.section}>Menu FordRetain</Text><PrimaryButton title='Clientes em risco' onPress={()=>navigation.navigate('RiskClients')}/><PrimaryButton title='Predição de cliente' onPress={()=>navigation.navigate('Prediction')}/><PrimaryButton title='Perfis de comportamento' onPress={()=>navigation.navigate('Profiles')}/><PrimaryButton title='Segurança e privacidade' onPress={()=>navigation.navigate('Security')}/><PrimaryButton title='Sobre o projeto' onPress={()=>navigation.navigate('About')}/></View>
    </ScrollView>
  );
}
const styles=StyleSheet.create({grid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',marginTop:14},section:{fontSize:18,fontWeight:'700',marginBottom:8}});
