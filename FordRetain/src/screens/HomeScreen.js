import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FordRetain</Text>
      <Text style={styles.subtitle}>Plataforma de retenção preditiva para concessionárias Ford</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Problema de negócio</Text>
        <Text style={styles.text}>Após o término da garantia, parte dos clientes deixa a rede oficial, reduzindo o VIN Share e o potencial de receita de pós-venda.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Etapas analíticas do FordRetain</Text>
        <Text style={styles.text}>1) Clustering: identifica perfis naturais como Cliente Fiel, Cliente em Risco, Cliente Esquecido e Cliente Econômico.</Text>
        <Text style={styles.text}>2) Classificação: estima risco de evasão com dados de revisão, veículo, garantia, frequência e gasto.</Text>
        <Text style={styles.text}>3) Ação de retenção: recomenda campanhas personalizadas para preservar relacionamento e retorno à oficina.</Text>
      </View>

      <PrimaryButton title="Acessar dashboard" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: colors.background, gap: 12 },
  title: { fontSize: 30, fontWeight: '700', color: colors.navy },
  subtitle: { color: colors.textGray },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 14, gap: 8 },
  cardTitle: { fontWeight: '700', color: colors.navy, fontSize: 16 },
  text: { color: '#1E293B', lineHeight: 20 },
});
