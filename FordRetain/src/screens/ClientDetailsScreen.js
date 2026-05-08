import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProfileBadge from '../components/ProfileBadge';
import colors from '../styles/colors';
import FeedbackModal from '../components/FeedbackModal';
import { useState } from 'react';

export default function ClientDetailsScreen({ route, navigation }) {
  const [feedback, setFeedback] = useState({ visible: false, title: '', message: '' });
  const client = route.params?.client;

  if (!client) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cliente não encontrado</Text>
        <Text style={styles.subtitle}>Não recebemos parâmetros da rota. Retorne para a lista de clientes.</Text>
        <PrimaryButton title="Voltar" onPress={() => navigation.navigate('Clients')} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{client.nome}</Text>
      <Text style={styles.subtitle}>{client.veiculo} • {client.ano} • {client.regiao}</Text>

      <View style={styles.card}>
        <ProfileBadge perfil={client.perfil} />
        <Text style={styles.row}><Text style={styles.label}>Risco previsto:</Text> {client.riscoEvasao}%</Text>
        <Text style={styles.row}><Text style={styles.label}>Fatores de risco:</Text> {client.fatoresRisco.join(', ')}</Text>
        <Text style={styles.row}><Text style={styles.label}>Última revisão:</Text> {client.tempoUltimaRevisaoMeses} meses</Text>
        <Text style={styles.row}><Text style={styles.label}>Idade do veículo:</Text> {client.idadeVeiculoAnos} anos</Text>
        <Text style={styles.row}><Text style={styles.label}>Garantia:</Text> {client.garantiaStatus}</Text>
        <Text style={styles.row}><Text style={styles.label}>Histórico:</Text> {client.historicoManutencao}</Text>
        <Text style={styles.row}><Text style={styles.label}>Frequência:</Text> {client.frequenciaVisitasAno} visita(s)/ano</Text>
        <Text style={styles.row}><Text style={styles.label}>Gasto:</Text> R$ {client.valorGastoServicos}</Text>
        <Text style={styles.row}><Text style={styles.label}>Distância:</Text> {client.distanciaConcessionariaKm} km</Text>
        <Text style={styles.row}><Text style={styles.label}>Ação recomendada:</Text> {client.acaoRecomendada}</Text>
      </View>

      <PrimaryButton title="Aplicar recomendação" onPress={() => setFeedback({ visible: true, title: 'Recomendação aplicada', message: `A ação de retenção para ${client.nome} foi aplicada e registrada.` })} />
      <PrimaryButton title="Registrar contato" onPress={() => setFeedback({ visible: true, title: 'Contato registrado', message: 'Contato de pós-venda registrado com sucesso no histórico do cliente.' })} />
      <PrimaryButton title="Voltar para clientes" variant="secondary" onPress={() => navigation.navigate('Clients')} />

      <FeedbackModal visible={feedback.visible} type="sucesso" title={feedback.title} message={feedback.message} buttonText="Continuar" onButtonPress={() => setFeedback((prev) => ({ ...prev, visible: false }))} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background, gap: 10 },
  title: { fontSize: 26, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray },
  card: { backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 8 },
  row: { color: '#1E293B', lineHeight: 20 },
  label: { fontWeight: '800', color: colors.navy },
});
