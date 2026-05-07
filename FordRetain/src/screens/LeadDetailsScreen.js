import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Tela de detalhes de um cliente em risco. Exibe informações básicas,
 * a probabilidade de evasão e a ação recomendada. O usuário pode
 * voltar à lista de leads.
 */
export default function LeadDetailsScreen({ route, navigation }) {
  const client = route.params?.client ?? route.params?.lead;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{client.nome ?? client.name}</Text>
      <Text style={styles.detail}>Perfil: {client.perfil ?? client.profile}</Text>
      <Text style={styles.detail}>
        Probabilidade de evasão: {Math.round((client.probabilidadeEvasao ?? client.probability) * 100)}%
      </Text>
      <Text style={styles.detail}>Ação recomendada:</Text>
      <Text style={styles.suggestion}>{client.acaoRecomendada ?? client.suggestion}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0f172a',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#60a5fa',
  },
  detail: {
    fontSize: 15,
    marginBottom: 12,
    color: '#cbd5e1',
    backgroundColor: 'rgba(30, 41, 59, 0.6)',
    padding: 14,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#60a5fa',
    borderWidth: 1,
    borderColor: '#334155',
    fontWeight: '500',
  },
  suggestion: {
    fontSize: 15,
    fontStyle: 'italic',
    marginBottom: 24,
    color: '#86efac',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
    borderWidth: 1,
    borderColor: '#334155',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});