import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';

const items = [
  'Proteção de dados sensíveis com criptografia em trânsito e em repouso.',
  'Dashboard com dados agregados para reduzir exposição de informações pessoais.',
  'Logs operacionais sem exibir dados pessoais identificáveis.',
  'Controle de acesso por perfil para gerentes, analistas e administradores.',
  'Auditoria de consultas e histórico de ações em dados críticos.',
  'Conformidade com LGPD como requisito central do projeto FordRetain.',
];

export default function SecurityScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Segurança e Privacidade</Text>
      {items.map((item, index) => (
        <View key={item} style={styles.card}>
          <Text style={styles.index}>{index + 1}</Text>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}

      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: colors.navy },
  card: { flexDirection: 'row', backgroundColor: colors.white, borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, padding: 12, marginBottom: 10 },
  index: { fontWeight: '700', color: colors.fordBlue, marginRight: 10 },
  text: { flex: 1, color: '#0F172A', lineHeight: 20 },
});
