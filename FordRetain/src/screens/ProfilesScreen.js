import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ProfileBadge from '../components/ProfileBadge';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';

const profiles = [
  { nome: 'Cliente Fiel', descricao: 'Alta recorrência em revisões e confiança no atendimento da concessionária.', risco: 'Baixo', estrategia: 'Programa de fidelidade, upgrades de serviço e relacionamento VIP.' },
  { nome: 'Cliente Econômico', descricao: 'Decide por preço e avalia custo-benefício antes de retornar.', risco: 'Médio', estrategia: 'Combos promocionais, parcelamento e comunicação de economia total.' },
  { nome: 'Cliente Esquecido', descricao: 'Perde prazos de revisão por rotina intensa e baixa lembrança da marca.', risco: 'Médio', estrategia: 'Lembretes preditivos multicanal e agendamento em poucos cliques.' },
  { nome: 'Cliente em Risco', descricao: 'Mostra sinais de evasão para oficinas independentes e queda de frequência.', risco: 'Alto', estrategia: 'Contato consultivo imediato com proposta de recuperação personalizada.' },
];

export default function ProfilesScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfis de Comportamento</Text>
      {profiles.map((profile) => (
        <View key={profile.nome} style={styles.card}>
          <ProfileBadge perfil={profile.nome} />
          <Text style={styles.text}><Text style={styles.label}>Descrição:</Text> {profile.descricao}</Text>
          <Text style={styles.text}><Text style={styles.label}>Risco:</Text> {profile.risco}</Text>
          <Text style={styles.text}><Text style={styles.label}>Estratégia de retenção:</Text> {profile.estrategia}</Text>
        </View>
      ))}

      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 12, color: colors.navy },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 8 },
  text: { color: '#334155', lineHeight: 20 },
  label: { fontWeight: '700', color: '#0f172a' },
});
