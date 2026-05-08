import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProfileBadge from '../components/ProfileBadge';
import colors from '../styles/colors';

export default function ClientDetailsScreen({ route, navigation }) {
  const client = route.params?.client;
  if (!client) {
    return <View style={styles.container}><Text>Cliente não encontrado.</Text></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{client.nome}</Text>
      <Text style={styles.subtitle}>{client.veiculo} • {client.ano} • {client.regiao}</Text>
      <View style={styles.card}>
        <ProfileBadge perfil={client.perfil} />
        <Text style={styles.item}><Text style={styles.label}>Risco previsto:</Text> {client.riscoEvasao}%</Text>
        <Text style={styles.item}><Text style={styles.label}>Tempo desde a última revisão:</Text> {client.tempoUltimaRevisaoMeses} meses</Text>
        <Text style={styles.item}><Text style={styles.label}>Idade do veículo:</Text> {client.idadeVeiculoAnos} anos</Text>
        <Text style={styles.item}><Text style={styles.label}>Garantia:</Text> {client.garantiaStatus}</Text>
        <Text style={styles.item}><Text style={styles.label}>Histórico de manutenção:</Text> {client.historicoManutencao}</Text>
        <Text style={styles.item}><Text style={styles.label}>Frequência de visitas:</Text> {client.frequenciaVisitasAno} visita(s)/ano</Text>
        <Text style={styles.item}><Text style={styles.label}>Valor gasto em serviços:</Text> R$ {client.valorGastoServicos}</Text>
        <Text style={styles.item}><Text style={styles.label}>Distância da concessionária:</Text> {client.distanciaConcessionariaKm} km</Text>
        <Text style={styles.item}><Text style={styles.label}>Recomendação:</Text> {client.acaoRecomendada}</Text>
      </View>
      <PrimaryButton title="Voltar para clientes" variant="secondary" onPress={() => navigation.navigate('Clients')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background, gap: 12 },
  title: { fontSize: 26, fontWeight: '700', color: colors.navy },
  subtitle: { color: colors.textGray },
  card: { backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 10 },
  item: { color: '#1E293B', lineHeight: 21 },
  label: { fontWeight: '700', color: colors.navy },
});
