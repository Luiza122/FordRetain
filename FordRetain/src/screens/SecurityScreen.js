import { ScrollView, StyleSheet, Text, View } from 'react-native';

const practices = [
  'Minimizar coleta de dados sensíveis e aplicar criptografia em repouso e em trânsito.',
  'Utilizar agregação e anonimização para análises, evitando exposição de dados individuais.',
  'Padronizar logs sem CPF, telefone completo ou outros identificadores diretos.',
  'Aplicar controle de acesso por perfil (RBAC), com princípio do menor privilégio.',
  'Manter trilhas de auditoria para consultas, exportações e alterações de dados críticos.',
];

export default function SecurityScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Segurança e Cyber</Text>
      <Text style={styles.subtitle}>Práticas recomendadas para uso responsável dos dados no Ford Retain:</Text>

      {practices.map((item, index) => (
        <View key={item} style={styles.card}>
          <Text style={styles.index}>{index + 1}.</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8fafc', flexGrow: 1 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#0f172a' },
  subtitle: { color: '#334155', marginBottom: 14 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  index: { fontWeight: '700', color: '#1d4ed8', marginRight: 8 },
  text: { flex: 1, color: '#0f172a' },
});
