import { Alert, ScrollView, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProfileBadge from '../components/ProfileBadge';
import globalStyles from '../styles/globalStyles';

export default function ClientDetailsScreen({ route }) {
  const { client } = route.params;
  const Row = ({ label, value }) => <Text style={{ marginBottom: 6 }}><Text style={{ fontWeight: '700' }}>{label}: </Text>{value}</Text>;
  return <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.container}><Text style={globalStyles.title}>{client.nome}</Text><View style={globalStyles.card}><Row label='Modelo' value={client.modelo}/><Row label='Ano' value={client.ano}/><Row label='Região' value={client.regiao}/><Row label='Canal de compra' value={client.canalCompra}/><Row label='Forma de pagamento' value={client.formaPagamento}/><Row label='Histórico com a marca' value={client.historicoMarca}/><Row label='Probabilidade de evasão' value={`${client.probabilidadeEvasao}%`}/><Row label='Motivo provável' value={client.motivo}/><Row label='Ação recomendada' value={client.acaoRecomendada}/><ProfileBadge perfil={client.perfil}/></View><PrimaryButton title='Marcar ação como planejada' onPress={() => Alert.alert('Sucesso', 'Ação marcada como planejada com sucesso.')}/></ScrollView>;
}
