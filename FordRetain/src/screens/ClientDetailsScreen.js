import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AuthGuard from '../components/AuthGuard';
import ProfileBadge from '../components/ProfileBadge';
import colors from '../styles/colors';
import FeedbackModal from '../components/FeedbackModal';
import mockClients from '../data/mockClients';
import { useState } from 'react';

export default function ClientDetailsScreen({ route, navigation }) {
  const [feedback, setFeedback] = useState({ visible: false, title: '', message: '' });
  const routeClient = route.params?.client;
  const routeId = route.params?.id;
  const client = routeClient || mockClients.find((item) => String(item.id) === String(routeId));

  if (!client) {
    return (
      <AuthGuard navigation={navigation}>
        <View style={styles.container}>
        <Text style={styles.title}>Cliente não encontrado</Text>
        <Text style={styles.subtitle}>Não recebemos um cliente válido. Retorne para a lista de clientes.</Text>
        <PrimaryButton title="Voltar" onPress={() => navigation.navigate('Clients')} />
        </View>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{client.nome}</Text>
      <Text style={styles.subtitle}>{client.veiculo} • {client.ano} • {client.regiao}</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Resultado preditivo</Text>
        <ProfileBadge perfil={client.perfil} />
        <Text style={styles.row}><Text style={styles.label}>Perfil previsto:</Text> {client.perfil}</Text>
        <Text style={styles.row}><Text style={styles.label}>Probabilidade do perfil:</Text> {client.probabilidadePerfil || client.riscoEvasao}%</Text>
        <Text style={styles.row}><Text style={styles.label}>Risco previsto:</Text> {client.riscoEvasao}%</Text>
        <Text style={styles.row}><Text style={styles.label}>Ação recomendada:</Text> {client.acaoRecomendada}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados da compra usados na classificação</Text>
        <Text style={styles.row}><Text style={styles.label}>Idade:</Text> {client.idade} anos</Text>
        <Text style={styles.row}><Text style={styles.label}>Região:</Text> {client.regiao}</Text>
        <Text style={styles.row}><Text style={styles.label}>Modelo:</Text> {client.modelo || client.veiculo}</Text>
        <Text style={styles.row}><Text style={styles.label}>Forma de pagamento:</Text> {client.formaPagamento}</Text>
        <Text style={styles.row}><Text style={styles.label}>Canal de compra:</Text> {client.canalCompra}</Text>
        <Text style={styles.row}><Text style={styles.label}>Histórico com a marca:</Text> {client.historicoMarca}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Dados pós-venda para o gerente acompanhar</Text>
        <Text style={styles.row}><Text style={styles.label}>Fatores de risco:</Text> {client.fatoresRisco.join(', ')}</Text>
        <Text style={styles.row}><Text style={styles.label}>Última revisão:</Text> {client.tempoUltimaRevisaoMeses} meses</Text>
        <Text style={styles.row}><Text style={styles.label}>Idade do veículo:</Text> {client.idadeVeiculoAnos} anos</Text>
        <Text style={styles.row}><Text style={styles.label}>Garantia:</Text> {client.garantiaStatus}</Text>
        <Text style={styles.row}><Text style={styles.label}>Histórico:</Text> {client.historicoManutencao}</Text>
        <Text style={styles.row}><Text style={styles.label}>Frequência:</Text> {client.frequenciaVisitasAno} visita(s)/ano</Text>
        <Text style={styles.row}><Text style={styles.label}>Gasto:</Text> R$ {client.valorGastoServicos}</Text>
        <Text style={styles.row}><Text style={styles.label}>Distância:</Text> {client.distanciaConcessionariaKm} km</Text>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.sectionTitle}>Observação técnica</Text>
        <Text style={styles.row}>Os dados pós-venda aparecem aqui apenas para análise do gerente. A tela de classificação preditiva usa somente dados disponíveis no momento da compra para evitar data leakage.</Text>
      </View>

      <PrimaryButton title="Aplicar recomendação" onPress={() => setFeedback({ visible: true, title: 'Recomendação aplicada', message: `A ação de retenção para ${client.nome} foi aplicada e registrada.` })} />
      <PrimaryButton title="Registrar contato" onPress={() => setFeedback({ visible: true, title: 'Contato registrado', message: 'Contato de pós-venda registrado com sucesso no histórico do cliente.' })} />
      <PrimaryButton title="Voltar para clientes" variant="secondary" onPress={() => navigation.navigate('Clients')} />

      <FeedbackModal visible={feedback.visible} type="sucesso" title={feedback.title} message={feedback.message} buttonText="Continuar" onButtonPress={() => setFeedback((prev) => ({ ...prev, visible: false }))} />
      </ScrollView>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background, gap: 10 },
  title: { fontSize: 26, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray },
  card: { backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 8 },
  noteCard: { backgroundColor: colors.lightBlue, borderRadius: 14, borderWidth: 1, borderColor: '#BFDBFE', padding: 14, gap: 8 },
  sectionTitle: { color: colors.fordBlue, fontWeight: '800', marginBottom: 2 },
  row: { color: '#1E293B', lineHeight: 20 },
  label: { fontWeight: '800', color: colors.navy },
});
