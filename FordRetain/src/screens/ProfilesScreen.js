import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ProfileBadge from '../components/ProfileBadge';
import colors from '../styles/colors';
import PrimaryButton from '../components/PrimaryButton';

const profiles = [
  {
    nome: 'Cliente Fiel',
    descricao: 'Alta aderência às revisões na rede autorizada.',
    comportamento: 'Agenda no prazo e valoriza experiência de atendimento.',
    risco: 'Baixo',
    estrategia: 'Fidelização premium com benefícios recorrentes.',
    exemplo: 'Rafael: 3 visitas/ano e alto ticket de serviço.',
  },
  {
    nome: 'Cliente Econômico',
    descricao: 'Sensível a preço e custo-benefício.',
    comportamento: 'Compara valores e adia decisões sem incentivo.',
    risco: 'Médio',
    estrategia: 'Combos promocionais e parcelamento de manutenção.',
    exemplo: 'Mariana: manutenção irregular após garantia.',
  },
  {
    nome: 'Cliente Esquecido',
    descricao: 'Baixa disciplina no calendário de revisão.',
    comportamento: 'Perde prazos por rotina corrida.',
    risco: 'Médio',
    estrategia: 'Lembretes automáticos com agendamento rápido.',
    exemplo: 'Patrícia: histórico bom, mas longos intervalos recentes.',
  },
  {
    nome: 'Cliente em Risco',
    descricao: 'Sinais claros de evasão para oficinas independentes.',
    comportamento: 'Longo tempo sem retorno e queda de gasto na rede oficial.',
    risco: 'Alto',
    estrategia: 'Contato consultivo imediato com proposta de recuperação.',
    exemplo: 'Ricardo: 14 meses sem revisão na concessionária.',
  },
];

export default function ProfilesScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clustering de Perfis</Text>
      <Text style={styles.subtitle}>Segmentação comportamental para aumentar retenção e eficiência comercial.</Text>

      {profiles.map((profile) => (
        <View key={profile.nome} style={styles.card}>
          <ProfileBadge perfil={profile.nome} />
          <Text style={styles.row}><Text style={styles.label}>Descrição:</Text> {profile.descricao}</Text>
          <Text style={styles.row}><Text style={styles.label}>Comportamento:</Text> {profile.comportamento}</Text>
          <Text style={styles.row}><Text style={styles.label}>Risco:</Text> {profile.risco}</Text>
          <Text style={styles.row}><Text style={styles.label}>Estratégia de retenção:</Text> {profile.estrategia}</Text>
          <Text style={styles.row}><Text style={styles.label}>Exemplo:</Text> {profile.exemplo}</Text>
        </View>
      ))}

      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 2, color: colors.navy },
  subtitle: { color: colors.textGray, marginBottom: 10 },
  card: { backgroundColor: colors.white, borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: colors.border, gap: 7 },
  row: { color: '#1E293B', lineHeight: 20 },
  label: { fontWeight: '800', color: colors.navy },
});
