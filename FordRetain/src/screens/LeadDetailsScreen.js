import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Tela de detalhes de um cliente em risco. Exibe informações básicas,
 * a probabilidade de evasão e a ação recomendada. O usuário pode
 * voltar à lista de leads.
 */
export default function LeadDetailsScreen({ route, navigation }) {
  const { lead } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lead.name}</Text>
      <Text style={styles.detail}>Perfil: {lead.profile}</Text>
      <Text style={styles.detail}>
        Probabilidade de evasão: {Math.round(lead.probability * 100)}%
      </Text>
      <Text style={styles.detail}>Ação recomendada:</Text>
      <Text style={styles.suggestion}>{lead.suggestion}</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  suggestion: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});