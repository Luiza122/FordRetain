import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';

const campaigns = [
  { titulo: 'Cupom de revisão', publico: 'Clientes Econômicos e em Risco', acao: 'Desconto progressivo para revisão completa em até 30 dias.' },
  { titulo: 'Contato preventivo', publico: 'Clientes em Risco', acao: 'Ligação consultiva para antecipar dúvidas e reduzir evasão.' },
  { titulo: 'Pacote de manutenção', publico: 'Garantia vencida', acao: 'Pacote anual com preço fixo, inspeção e benefícios de retorno.' },
  { titulo: 'Campanha personalizada', publico: 'Perfis mistos', acao: 'Mensagens por perfil com argumentos de valor e conveniência.' },
  { titulo: 'Lembrete de revisão', publico: 'Clientes Esquecidos', acao: 'Fluxo automatizado via WhatsApp, e-mail e push.' },
  { titulo: 'Prioridade no atendimento', publico: 'Clientes Fiéis', acao: 'Canal dedicado e agendamento expresso para fortalecer vínculo.' },
];

export default function RecommendationsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recomendações de Retenção</Text>
      {campaigns.map((item) => (
        <View key={item.titulo} style={styles.card}>
          <Text style={styles.cardTitle}>{item.titulo}</Text>
          <Text style={styles.text}><Text style={styles.label}>Público-alvo:</Text> {item.publico}</Text>
          <Text style={styles.text}><Text style={styles.label}>Ação:</Text> {item.acao}</Text>
        </View>
      ))}
      <PrimaryButton title="Voltar ao dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1, gap: 10 },
  title: { fontSize: 24, fontWeight: '700', color: colors.navy },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, gap: 6 },
  cardTitle: { fontWeight: '700', color: colors.navy },
  text: { color: '#334155', lineHeight: 20 },
  label: { fontWeight: '700' },
});
