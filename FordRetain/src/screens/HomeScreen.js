import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';
import { getMockCredentials } from '../data/mockAuth';

const STEPS = [
  {
    title: '1) Clustering de perfis',
    text: 'Segmenta a base em Cliente Fiel, Econômico, Esquecido e Cliente de Abandono para comunicação personalizada.',
  },
  {
    title: '2) Classificação de risco',
    text: 'Estima o perfil do cliente usando apenas dados disponíveis no momento da compra, evitando data leakage.',
  },
  {
    title: '3) Recomendações de retenção',
    text: 'Sugere ações preventivas por perfil para recuperar clientes e proteger o VIN Share da concessionária.',
  },
];

export default function HomeScreen({ navigation }) {
  const user = getMockCredentials();
  const isManager = user?.profile === 'Gerente';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>FordRetain</Text>
        <Text style={styles.subtitle}>Plataforma preditiva para retenção no pós-venda Ford.</Text>
      </View>

      <View style={styles.profileCard}>
        <Text style={styles.profileTitle}>Usuário logado</Text>
        <Text style={styles.text}>Nome: {user?.name || 'Usuário cadastrado'}</Text>
        <Text style={styles.text}>Perfil: {user?.profile || 'Não identificado'}</Text>
        <Text style={styles.profileDescription}>
          {isManager
            ? 'Acesso de gerente: dashboard executivo, classificação, clustering, recomendações e clientes.'
            : 'Acesso de atendente: foco operacional em clientes, detalhes, contato e recomendações.'}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>O que é VIN Share</Text>
        <Text style={styles.text}>
          VIN Share é a participação da concessionária nas manutenções potenciais da sua base de veículos. Quando clientes
          deixam a rede após a garantia, o VIN Share cai, reduzindo receita, recorrência e valor do relacionamento.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Por que os clientes evadem</Text>
        <Text style={styles.text}>
          Preço percebido, distância, esquecimento do ciclo de revisão e ausência de contato preventivo são os fatores mais
          comuns de migração para oficinas independentes.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Como o FordRetain resolve</Text>
        {STEPS.map((step) => (
          <View key={step.title} style={styles.stepItem}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.text}>{step.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        {isManager ? <PrimaryButton title="Dashboard Executivo" onPress={() => navigation.navigate('Dashboard')} /> : null}
        <PrimaryButton title="Clientes" onPress={() => navigation.navigate('Clients')} />
        {isManager ? <PrimaryButton title="Classificação" onPress={() => navigation.navigate('Prediction')} /> : null}
        {isManager ? <PrimaryButton title="Clustering" onPress={() => navigation.navigate('Profiles')} /> : null}
        <PrimaryButton title="Recomendações" onPress={() => navigation.navigate('Recommendations')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background, gap: 12 },
  hero: { backgroundColor: colors.navy, borderRadius: 16, padding: 16 },
  title: { fontSize: 30, fontWeight: '800', color: colors.white },
  subtitle: { color: '#DBEAFE', marginTop: 4 },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 14, padding: 14, gap: 8 },
  profileCard: { backgroundColor: colors.lightBlue, borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 14, padding: 14, gap: 5 },
  profileTitle: { fontWeight: '800', color: colors.navy, fontSize: 16 },
  profileDescription: { color: colors.fordBlue, fontWeight: '700', lineHeight: 20 },
  cardTitle: { fontWeight: '800', color: colors.fordBlue, fontSize: 16 },
  stepItem: { marginTop: 2 },
  stepTitle: { color: colors.navy, fontWeight: '700' },
  text: { color: '#1E293B', lineHeight: 20 },
  actions: { marginTop: 8, marginBottom: 8 },
});
