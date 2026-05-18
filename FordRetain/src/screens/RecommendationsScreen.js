import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';
import AuthGuard from '../components/AuthGuard';
import FeedbackModal from '../components/FeedbackModal';

const campaigns = [
  { titulo: 'Programa de fidelidade', publico: 'Clientes Fiéis', objetivo: 'Manter recorrência e aumentar satisfação', acao: 'Benefícios exclusivos, revisão premium e prioridade de atendimento', canal: 'App + e-mail', prazo: 'Mensal', impacto: 'Aumento de relacionamento e defesa do VIN Share', prioridade: 'Baixa' },
  { titulo: 'Cupom de revisão', publico: 'Clientes Econômicos', objetivo: 'Aumentar retorno imediato', acao: 'Desconto progressivo com validade de 15 dias', canal: 'WhatsApp e SMS', prazo: '48 horas', impacto: 'Incremento de 12% nos agendamentos de curto prazo', prioridade: 'Média' },
  { titulo: 'Lembrete com agendamento fácil', publico: 'Clientes Esquecidos', objetivo: 'Evitar perda do timing da revisão', acao: 'Mensagem automática com link de agendamento em um clique', canal: 'WhatsApp + push', prazo: '7 dias antes do prazo', impacto: 'Redução de atrasos e maior previsibilidade de retorno', prioridade: 'Média' },
  { titulo: 'Pacote de recuperação', publico: 'Clientes de Abandono', objetivo: 'Evitar evasão para oficinas independentes', acao: 'Ligação consultiva com pacote de revisões e diagnóstico gratuito', canal: 'Telefone + CRM', prazo: 'Hoje', impacto: 'Redução de 18% no risco de evasão dos clientes críticos', prioridade: 'Alta' },
];

export default function RecommendationsScreen({ navigation }) {
  const [executedCampaign, setExecutedCampaign] = useState(null);

  return (
    <AuthGuard navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Recomendações de Retenção</Text>
      <Text style={styles.subtitle}>Campanhas orientadas por risco, perfis de cluster e oportunidade de recuperação comercial.</Text>

      {campaigns.map((item) => (
        <View key={item.titulo} style={styles.card}>
          <Text style={styles.cardTitle}>{item.titulo}</Text>
          <Text style={styles.row}><Text style={styles.label}>Público-alvo:</Text> {item.publico}</Text>
          <Text style={styles.row}><Text style={styles.label}>Objetivo:</Text> {item.objetivo}</Text>
          <Text style={styles.row}><Text style={styles.label}>Ação sugerida:</Text> {item.acao}</Text>
          <Text style={styles.row}><Text style={styles.label}>Canal recomendado:</Text> {item.canal}</Text>
          <Text style={styles.row}><Text style={styles.label}>Prazo de execução:</Text> {item.prazo}</Text>
          <Text style={styles.row}><Text style={styles.label}>Impacto esperado:</Text> {item.impacto}</Text>
          <Text style={styles.row}><Text style={styles.label}>Prioridade:</Text> {item.prioridade}</Text>
          <PrimaryButton title="Executar campanha" onPress={() => setExecutedCampaign(item)} />
        </View>
      ))}

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Diferencial mobile</Text>
        <Text style={styles.row}>A campanha de clientes esquecidos simula uma notificação push, mostrando como o gerente poderia ser alertado quando um cliente crítico fosse identificado.</Text>
      </View>

      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />

      <FeedbackModal
        visible={Boolean(executedCampaign)}
        type="sucesso"
        title="Campanha executada com sucesso"
        message={executedCampaign ? `A campanha ${executedCampaign.titulo} foi registrada para acompanhamento no CRM.` : ''}
        buttonText="Voltar para recomendações"
        secondaryButtonText="Ir para Dashboard"
        onButtonPress={() => setExecutedCampaign(null)}
        onSecondaryButtonPress={() => {
          setExecutedCampaign(null);
          navigation.navigate('Dashboard');
        }}
      />
      </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1, gap: 10 },
  title: { fontSize: 24, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, gap: 6 },
  cardTitle: { fontWeight: '800', color: colors.fordBlue, fontSize: 17 },
  noteCard: { backgroundColor: colors.lightBlue, borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 14, padding: 14, gap: 6 },
  noteTitle: { fontWeight: '800', color: colors.navy, fontSize: 16 },
  row: { color: '#1E293B', lineHeight: 21 },
  label: { fontWeight: '800', color: colors.navy },
});
