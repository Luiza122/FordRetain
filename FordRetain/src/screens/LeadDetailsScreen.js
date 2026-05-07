import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';

export default function LeadDetailsScreen({ route }) {
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
      <View style={styles.card}>
        <Text style={styles.item}><Text style={styles.label}>Modelo:</Text> {client.modelo}</Text>
        <Text style={styles.item}><Text style={styles.label}>Ano:</Text> {client.ano}</Text>
        <Text style={styles.item}><Text style={styles.label}>Região:</Text> {client.regiao}</Text>
        <Text style={styles.item}><Text style={styles.label}>Canal de compra:</Text> {client.canalCompra}</Text>
        <Text style={styles.item}><Text style={styles.label}>Forma de pagamento:</Text> {client.formaPagamento}</Text>
        <Text style={styles.item}><Text style={styles.label}>Perfil previsto:</Text> {client.perfil}</Text>
        <Text style={styles.item}><Text style={styles.label}>Probabilidade de evasão:</Text> {client.probabilidadeEvasao}%</Text>
        <Text style={styles.item}><Text style={styles.label}>Motivo provável:</Text> {client.motivo}</Text>
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
  container: { flexGrow: 1, padding: 16, backgroundColor: '#F8FAFC', gap: 14 },
  title: { fontSize: 24, fontWeight: '700', color: colors.primaryDark },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    gap: 10,
  },
  item: { color: '#1E293B', lineHeight: 20 },
  label: { fontWeight: '700', color: '#0F172A' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' },
  emptyText: { color: colors.textGray, fontSize: 16 },
});
