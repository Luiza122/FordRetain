import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProfileBadge from '../components/ProfileBadge';
import colors from '../styles/colors';

export default function ClientDetailsScreen({ route, navigation }) {
  const client = route.params?.client;

  if (!client) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Cliente não encontrado.</Text>
        <PrimaryButton title="Voltar para clientes em risco" onPress={() => navigation.navigate('RiskClients')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{client.nome}</Text>
      <Text style={styles.subtitle}>{client.modelo} • {client.ano} • {client.regiao}</Text>

      <View style={styles.card}>
        <ProfileBadge perfil={client.perfil} />
        <Text style={styles.item}><Text style={styles.label}>Canal de compra:</Text> {client.canalCompra}</Text>
        <Text style={styles.item}><Text style={styles.label}>Forma de pagamento:</Text> {client.formaPagamento}</Text>
        <Text style={styles.item}><Text style={styles.label}>Histórico com a marca:</Text> {client.historicoMarca}</Text>
        <Text style={styles.item}><Text style={styles.label}>Probabilidade de evasão:</Text> {client.probabilidadeEvasao}%</Text>
        <Text style={styles.item}><Text style={styles.label}>Motivo provável da evasão:</Text> {client.motivo}</Text>
        <Text style={styles.item}><Text style={styles.label}>Ação recomendada:</Text> {client.acaoRecomendada}</Text>
      </View>

      <PrimaryButton
        title="Marcar ação como planejada"
        onPress={() => Alert.alert('Ação planejada com sucesso', 'A concessionária poderá acompanhar este cliente na próxima etapa.')}
      />
      <PrimaryButton title="Voltar para clientes em risco" variant="secondary" onPress={() => navigation.navigate('RiskClients')} />
      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background, gap: 12 },
  title: { fontSize: 26, fontWeight: '700', color: colors.navy },
  subtitle: { color: colors.textGray, marginBottom: 4 },
  card: { backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 10 },
  item: { color: '#1E293B', lineHeight: 21 },
  label: { fontWeight: '700', color: colors.navy },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background, padding: 16 },
  emptyText: { color: colors.textGray, fontSize: 16, marginBottom: 10 },
});
