import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';

const sections = [
  {
    title: 'Problema de negócio',
    text: 'Concessionárias perdem receitas de pós-venda quando clientes migram para oficinas independentes. O FordRetain antecipa risco de evasão para ação rápida.',
  },
  {
    title: 'O que é VIN Share',
    text: 'VIN Share representa a participação da rede oficial no volume total de serviços realizados para veículos Ford ao longo do ciclo de vida.',
  },
  {
    title: 'Como o FordRetain ajuda',
    text: 'O app consolida métricas, prioriza clientes em risco e recomenda ações personalizadas para elevar retenção e rentabilidade da concessionária.',
  },
  {
    title: 'Arquitetura',
    text: 'Base histórica → Clustering → Perfis → Classificação → API → App Mobile.',
  },
  {
    title: 'Relação com disciplinas',
    text: 'IA/ML, Mobile, Web Services, Cybersecurity e QA/Testing atuam de forma integrada no desenho e evolução da solução.',
  },
];

export default function AboutScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o Projeto</Text>
      {sections.map((section) => (
        <View key={section.title} style={styles.card}>
          <Text style={styles.heading}>{section.title}</Text>
          <Text style={styles.text}>{section.text}</Text>
        </View>
      ))}

      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: colors.navy },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  heading: { fontSize: 16, fontWeight: '700', marginBottom: 6, color: colors.fordBlue },
  text: { color: '#334155', lineHeight: 20 },
});
