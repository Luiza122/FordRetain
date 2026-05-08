import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';

const campaigns = [
  { titulo: 'Cupom de revisão', publico: 'Clientes Econômicos', objetivo: 'Aumentar retorno imediato', acao: 'Desconto progressivo com validade de 15 dias', canal: 'WhatsApp e SMS', prazo: '48 horas' },
  { titulo: 'Contato preventivo', publico: 'Clientes em Risco', objetivo: 'Evitar evasão para oficinas independentes', acao: 'Ligação consultiva com proposta personalizada', canal: 'Telefone + CRM', prazo: 'Hoje' },
  { titulo: 'Pacote de manutenção', publico: 'Garantia vencida', objetivo: 'Restabelecer recorrência', acao: 'Plano anual com preço fixo e parcelamento', canal: 'E-mail + balcão', prazo: '7 dias' },
  { titulo: 'Campanha personalizada', publico: 'Perfis mistos', objetivo: 'Melhorar conversão por perfil', acao: 'Oferta orientada por cluster comportamental', canal: 'Automação de marketing', prazo: 'Semanal' },
  { titulo: 'Lembrete de revisão', publico: 'Clientes Esquecidos', objetivo: 'Reduzir atraso de manutenção', acao: 'Fluxo automático com link de agendamento', canal: 'Push + WhatsApp', prazo: 'Contínuo' },
  { titulo: 'Prioridade no atendimento', publico: 'Clientes Fiéis', objetivo: 'Reforçar lealdade', acao: 'Janela expressa de atendimento e check-in rápido', canal: 'Central dedicada', prazo: 'Imediato' },
];

export default function RecommendationsScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recomendações de Retenção</Text>
      <Text style={styles.subtitle}>Campanhas orientadas por risco e comportamento do cliente.</Text>

      {campaigns.map((item) => (
        <View key={item.titulo} style={styles.card}>
          <Text style={styles.cardTitle}>{item.titulo}</Text>
          <Text style={styles.row}><Text style={styles.label}>Público-alvo:</Text> {item.publico}</Text>
          <Text style={styles.row}><Text style={styles.label}>Objetivo:</Text> {item.objetivo}</Text>
          <Text style={styles.row}><Text style={styles.label}>Ação sugerida:</Text> {item.acao}</Text>
          <Text style={styles.row}><Text style={styles.label}>Canal recomendado:</Text> {item.canal}</Text>
          <Text style={styles.row}><Text style={styles.label}>Prazo de execução:</Text> {item.prazo}</Text>
          <PrimaryButton title="Executar campanha" onPress={() => Alert.alert('Simulação', `${item.titulo} registrada no CRM.`)} />
        </View>
      ))}

      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1, gap: 10 },
  title: { fontSize: 24, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, gap: 6 },
  cardTitle: { fontWeight: '800', color: colors.fordBlue },
  row: { color: '#1E293B', lineHeight: 20 },
  label: { fontWeight: '800', color: colors.navy },
});
