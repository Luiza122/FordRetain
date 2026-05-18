import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AppLogo from '../components/AppLogo';
import colors from '../styles/colors';
import AuthGuard from '../components/AuthGuard';
import { getMockCredentials, logoutMockUser } from '../data/mockAuth';

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

  function handleLogout() {
    logoutMockUser();
    navigation.replace('Login');
  }

  return (
    <AuthGuard navigation={navigation}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <AppLogo small />
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
          <PrimaryButton title="Sair e voltar ao Login" variant="secondary" onPress={handleLogout} />
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
          <Text style={styles.cardTitle}>Como a solução resolve</Text>
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
    </AuthGuard>
  );
}

const cardShadow = {
  shadowColor: colors.shadow,
  shadowOpacity: 0.08,
  shadowRadius: 14,
  shadowOffset: { width: 0, height: 8 },
  elevation: 3,
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background, gap: 12, paddingBottom: 26 },
  hero: { backgroundColor: colors.navy, borderRadius: 28, padding: 20, alignItems: 'center', ...cardShadow },
  subtitle: { color: '#DBEAFE', marginTop: 14, textAlign: 'center', fontWeight: '700', lineHeight: 20 },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.borderSoft, borderRadius: 22, padding: 16, gap: 8, ...cardShadow },
  profileCard: { backgroundColor: colors.lightBlue, borderWidth: 1, borderColor: '#BFDBFE', borderRadius: 22, padding: 16, gap: 6, ...cardShadow },
  profileTitle: { fontWeight: '900', color: colors.navy, fontSize: 18 },
  profileDescription: { color: colors.fordBlue, fontWeight: '800', lineHeight: 20 },
  cardTitle: { fontWeight: '900', color: colors.fordBlue, fontSize: 17 },
  stepItem: { marginTop: 2 },
  stepTitle: { color: colors.navy, fontWeight: '800' },
  text: { color: colors.textDark, lineHeight: 21 },
  actions: { backgroundColor: colors.white, borderRadius: 22, borderWidth: 1, borderColor: colors.borderSoft, padding: 12, marginTop: 2, ...cardShadow },
});
