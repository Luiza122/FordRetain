import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProfileBadge from '../components/ProfileBadge';
import colors from '../styles/colors';

export default function ClientDetailsScreen({ route, navigation }) {
  const client = route.params?.client;
  if (!client) {
    return <View style={styles.empty}><Text style={styles.emptyText}>Cliente não encontrado. Retorne para a lista e selecione novamente.</Text><PrimaryButton title="Voltar" onPress={() => navigation.navigate('Clients')} /></View>;
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{client.nome}</Text>
      <Text style={styles.subtitle}>{client.veiculo} • {client.ano} • {client.regiao}</Text>
      <View style={styles.card}><ProfileBadge perfil={client.perfil} />
        <Text style={styles.item}><Text style={styles.label}>Risco previsto:</Text> {client.riscoEvasao}%</Text>
        <Text style={styles.item}><Text style={styles.label}>Tempo sem revisão:</Text> {client.tempoUltimaRevisaoMeses} meses</Text>
        <Text style={styles.item}><Text style={styles.label}>Idade do veículo:</Text> {client.idadeVeiculoAnos} anos</Text>
        <Text style={styles.item}><Text style={styles.label}>Garantia:</Text> {client.garantiaStatus}</Text>
        <Text style={styles.item}><Text style={styles.label}>Histórico:</Text> {client.historicoManutencao}</Text>
        <Text style={styles.item}><Text style={styles.label}>Frequência:</Text> {client.frequenciaVisitasAno}/ano</Text>
        <Text style={styles.item}><Text style={styles.label}>Gasto anual:</Text> R$ {client.valorGastoServicos}</Text>
        <Text style={styles.item}><Text style={styles.label}>Distância:</Text> {client.distanciaConcessionariaKm} km</Text>
        <Text style={styles.item}><Text style={styles.label}>Fatores de risco:</Text> {client.fatoresRisco.join(', ')}</Text>
        <Text style={styles.item}><Text style={styles.label}>Ação recomendada:</Text> {client.acaoRecomendada}</Text>
      </View>
      <PrimaryButton title="Aplicar recomendação" onPress={() => Alert.alert('Simulação', 'Recomendação aplicada e registrada no CRM da concessionária.')} />
      <PrimaryButton title="Registrar contato" onPress={() => Alert.alert('Simulação', 'Contato registrado com sucesso para acompanhamento.')} />
      <PrimaryButton title="Voltar" variant="secondary" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}
const styles=StyleSheet.create({container:{padding:16,backgroundColor:colors.background,flexGrow:1,gap:10},title:{fontSize:26,fontWeight:'800',color:colors.navy},subtitle:{color:colors.textGray},card:{backgroundColor:colors.white,borderRadius:14,borderWidth:1,borderColor:colors.border,padding:14,gap:8},item:{color:'#1E293B',lineHeight:20},label:{fontWeight:'700',color:colors.navy},empty:{flex:1,justifyContent:'center',padding:20,backgroundColor:colors.background},emptyText:{marginBottom:8,color:colors.textGray}});
