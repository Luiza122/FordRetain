import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o Ford Retain</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Problema de negócio</Text>
        <Text style={styles.text}>
          Reduzir churn no pós-venda e aumentar retenção em serviços de concessionária, combatendo
          evasão para oficinas independentes.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Impacto no VIN Share</Text>
        <Text style={styles.text}>
          A melhoria da retenção eleva o VIN Share ao aumentar a participação da rede autorizada nas
          manutenções e revisões ao longo do ciclo de vida do veículo.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Arquitetura analítica</Text>
        <Text style={styles.text}>
          Base histórica → clustering → perfis → classificação → API → app.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Disciplinas FIAP envolvidas</Text>
        <Text style={styles.text}>
          Data Science e Machine Learning, Mobile Application Development, Cloud Computing,
          Cybersecurity, Engenharia de Software e UX.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8fafc', flexGrow: 1 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#0f172a' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  heading: { fontSize: 16, fontWeight: '700', marginBottom: 6, color: '#1e3a8a' },
  text: { color: '#334155', lineHeight: 20 },
});
