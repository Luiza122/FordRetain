import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';

const STEPS = [
  {
    title: '1) Clustering de perfis',
    text: 'Segmenta a base em Cliente Fiel, Econômico, Esquecido e em Risco para comunicação personalizada.',
  },
  {
    title: '2) Classificação de risco',
    text: 'Estima probabilidade de evasão usando variáveis de manutenção, garantia, frequência e comportamento.',
  },
  {
    title: '3) Recomendações de retenção',
    text: 'Sugere ações preventivas por perfil para recuperar clientes e proteger o VIN Share da concessionária.',
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>FordRetain</Text>
        <Text style={styles.subtitle}>Plataforma preditiva para retenção no pós-venda Ford.</Text>
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
        <PrimaryButton title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
        <PrimaryButton title="Clientes" onPress={() => navigation.navigate('Clients')} />
        <PrimaryButton title="Classificação" onPress={() => navigation.navigate('Prediction')} />
        <PrimaryButton title="Clustering" onPress={() => navigation.navigate('Profiles')} />
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
  cardTitle: { fontWeight: '800', color: colors.fordBlue, fontSize: 16 },
  stepItem: { marginTop: 2 },
  stepTitle: { color: colors.navy, fontWeight: '700' },
  text: { color: '#1E293B', lineHeight: 20 },
  actions: { marginTop: 8, marginBottom: 8 },
});
