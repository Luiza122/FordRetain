import { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import mockClients from '../data/mockClients';
import ClientCard from '../components/ClientCard';
import colors from '../styles/colors';

export default function RiskClientsScreen({ navigation }) {
  const [filter, setFilter] = useState('Todos');
  const clients = useMemo(() => {
    const sorted = [...mockClients].sort((a, b) => b.riscoEvasao - a.riscoEvasao);
    if (filter === 'Alto') return sorted.filter((c) => c.riscoEvasao >= 70);
    if (filter === 'Médio') return sorted.filter((c) => c.riscoEvasao >= 50 && c.riscoEvasao < 70);
    if (filter === 'Baixo') return sorted.filter((c) => c.riscoEvasao < 50);
    return sorted;
  }, [filter]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes priorizados por risco</Text>
      <Text style={styles.caption}>A priorização orienta o consultor de pós-venda a agir primeiro sobre casos com maior probabilidade de evasão.</Text>
      <View style={styles.filters}><PrimaryButton title="Todos" variant={filter==='Todos'?'primary':'secondary'} onPress={() => setFilter('Todos')} /><PrimaryButton title="Alto" variant={filter==='Alto'?'primary':'secondary'} onPress={() => setFilter('Alto')} /><PrimaryButton title="Médio" variant={filter==='Médio'?'primary':'secondary'} onPress={() => setFilter('Médio')} /><PrimaryButton title="Baixo" variant={filter==='Baixo'?'primary':'secondary'} onPress={() => setFilter('Baixo')} /></View>
      <FlatList data={clients} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => <ClientCard cliente={item} onPress={(cliente) => navigation.navigate('ClientDetails', { client: cliente })} />} ItemSeparatorComponent={() => <View style={{ height: 10 }} />} contentContainerStyle={{ paddingBottom: 20 }} />
      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}
const styles=StyleSheet.create({container:{flex:1,backgroundColor:colors.background,padding:16},title:{fontSize:23,fontWeight:'800',color:colors.navy},caption:{color:colors.textGray,marginTop:6,marginBottom:8,lineHeight:19},filters:{marginBottom:6}});
