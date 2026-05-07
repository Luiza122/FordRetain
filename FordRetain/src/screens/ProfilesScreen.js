import { ScrollView, StyleSheet, Text, View } from 'react-native';

const profiles = [
  {
    nome: 'Oficina Fidelizada',
    descricao: 'Cliente com alta recorrência em serviços, boa relação com a concessionária e baixa sensibilidade a preço.',
    estrategia: 'Reforçar relacionamento com benefícios exclusivos e planos de manutenção anual.',
  },
  {
    nome: 'Sensível a Preço',
    descricao: 'Cliente que compara valores e tende a postergar revisões quando há pressão financeira.',
    estrategia: 'Criar ofertas com preço alvo, parcelamento e combos de serviços essenciais.',
  },
  {
    nome: 'Digital Engajado',
    descricao: 'Cliente ativo nos canais digitais, responde a notificações e usa app para interação.',
    estrategia: 'Automatizar lembretes e ofertas personalizadas com jornada 100% digital.',
  },
  {
    nome: 'Risco de Evasão',
    descricao: 'Cliente com sinais de queda de frequência, atrasos e possível migração para oficinas independentes.',
    estrategia: 'Ação proativa do time comercial com proposta consultiva e recuperação imediata.',
  },
];

export default function ProfilesScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Perfis de Clientes</Text>
      {profiles.map((profile) => (
        <View key={profile.nome} style={styles.card}>
          <Text style={styles.cardTitle}>{profile.nome}</Text>
          <Text style={styles.text}><Text style={styles.label}>Descrição:</Text> {profile.descricao}</Text>
          <Text style={styles.text}><Text style={styles.label}>Estratégia de retenção:</Text> {profile.estrategia}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8fafc', flexGrow: 1 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#0f172a' },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#1e3a8a' },
  text: { marginBottom: 8, color: '#334155' },
  label: { fontWeight: '700', color: '#0f172a' },
});
