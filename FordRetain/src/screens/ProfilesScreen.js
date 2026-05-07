import { ScrollView, Text, View } from 'react-native';
import ProfileBadge from '../components/ProfileBadge';
import globalStyles from '../styles/globalStyles';

const profiles = [
  { nome: 'Cliente Fiel', descricao: 'Cliente com alto vínculo com a marca e histórico de recorrência na rede.', risco: 'Baixo', estrategia: 'Programas VIP e ofertas de fidelização de longo prazo.' },
  { nome: 'Cliente Econômico', descricao: 'Cliente sensível a preço, promoção e condição de pagamento.', risco: 'Médio', estrategia: 'Pacotes de manutenção com benefício financeiro claro.' },
  { nome: 'Cliente Esquecido', descricao: 'Cliente que perde frequência de relacionamento por falta de lembretes.', risco: 'Médio/Alto', estrategia: 'Automação de lembretes e agenda assistida por consultor.' },
  { nome: 'Cliente de Abandono', descricao: 'Cliente com baixa afinidade e alta chance de evasão da rede oficial.', risco: 'Alto', estrategia: 'Plano de reconquista com contato ativo e proposta personalizada.' },
];

export default function ProfilesScreen() {
  return <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.container}><Text style={globalStyles.title}>Perfis de comportamento</Text>{profiles.map((p) => <View key={p.nome} style={globalStyles.card}><ProfileBadge perfil={p.nome}/><Text style={{ marginTop: 8 }}>{p.descricao}</Text><Text><Text style={{ fontWeight: '700' }}>Risco: </Text>{p.risco}</Text><Text><Text style={{ fontWeight: '700' }}>Estratégia: </Text>{p.estrategia}</Text></View>)}</ScrollView>;
}
