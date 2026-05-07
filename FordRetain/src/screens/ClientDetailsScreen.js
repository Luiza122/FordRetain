import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProfileBadge from '../components/ProfileBadge';
import colors from '../styles/colors';

export default function ClientDetailsScreen({ route }) {
  const client = route.params?.client;

  if (!client) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Cliente não encontrado.</Text>
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
        onPress={() => Alert.alert('Sucesso', 'Ação marcada como planejada com sucesso.')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#F8FAFC', gap: 12 },
  title: { fontSize: 26, fontWeight: '700', color: colors.primaryDark },
  subtitle: { color: colors.slate, marginBottom: 4 },
  card: { backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', padding: 14, gap: 10 },
  item: { color: '#1E293B', lineHeight: 21 },
  label: { fontWeight: '700', color: '#0F172A' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' },
  emptyText: { color: colors.slate, fontSize: 16 },
});
