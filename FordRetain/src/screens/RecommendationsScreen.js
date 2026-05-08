import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';

const campaigns = [
  { titulo:'Cupom de revisão', publico:'Clientes Econômicos', objetivo:'Aumentar retorno em até 30 dias', acao:'Desconto progressivo para revisão completa', canal:'WhatsApp + SMS', prazo:'Imediato' },
  { titulo:'Contato preventivo', publico:'Clientes em Risco', objetivo:'Reduzir evasão crítica', acao:'Contato ativo do consultor', canal:'Ligação + WhatsApp', prazo:'48 horas' },
  { titulo:'Pacote de manutenção', publico:'Garantia vencida', objetivo:'Recuperar receita de pós-venda', acao:'Plano anual com preço fixo', canal:'E-mail + Atendimento presencial', prazo:'7 dias' },
  { titulo:'Campanha personalizada', publico:'Perfis mistos', objetivo:'Melhorar taxa de conversão', acao:'Oferta específica por perfil', canal:'CRM omnichannel', prazo:'Semanal' },
  { titulo:'Lembrete de revisão', publico:'Clientes Esquecidos', objetivo:'Evitar perda por esquecimento', acao:'Sequência automática de lembretes', canal:'Push + WhatsApp', prazo:'Mensal' },
  { titulo:'Prioridade no atendimento', publico:'Clientes Fiéis', objetivo:'Fortalecer relacionamento', acao:'Fila prioritária e check-in rápido', canal:'Aplicativo + recepção', prazo:'Contínuo' },
];

export default function RecommendationsScreen({ navigation }) {
  return <ScrollView contentContainerStyle={styles.container}><Text style={styles.title}>Recomendações de retenção</Text>{campaigns.map((c)=><View key={c.titulo} style={styles.card}><Text style={styles.cardTitle}>{c.titulo}</Text><Text style={styles.text}>Público-alvo: {c.publico}</Text><Text style={styles.text}>Objetivo: {c.objetivo}</Text><Text style={styles.text}>Ação sugerida: {c.acao}</Text><Text style={styles.text}>Canal recomendado: {c.canal}</Text><Text style={styles.text}>Prazo: {c.prazo}</Text><PrimaryButton title="Executar ação" onPress={()=>Alert.alert('Simulação',`Ação "${c.titulo}" disparada.`)} /></View>)}<PrimaryButton title="Voltar" variant="secondary" onPress={()=>navigation.navigate('Dashboard')} /></ScrollView>;
}
const styles=StyleSheet.create({container:{padding:16,backgroundColor:colors.background,flexGrow:1},title:{fontSize:24,fontWeight:'800',color:colors.navy,marginBottom:10},card:{backgroundColor:colors.white,borderWidth:1,borderColor:colors.border,borderRadius:12,padding:14,marginBottom:10},cardTitle:{fontWeight:'700',color:colors.navy,marginBottom:6},text:{color:'#334155',lineHeight:19}});
