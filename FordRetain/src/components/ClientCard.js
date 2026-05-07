import { Pressable, Text, View, StyleSheet } from 'react-native';
import ProfileBadge from './ProfileBadge';

export default function ClientCard({ cliente, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(cliente)}>
      <View style={styles.rowBetween}>
        <Text style={styles.nome}>{cliente.nome}</Text>
        <Text style={styles.probabilidade}>{cliente.probabilidadeEvasao}%</Text>
      </View>
      <Text style={styles.meta}>{cliente.modelo} • {cliente.ano} • {cliente.regiao}</Text>
      <ProfileBadge perfil={cliente.perfil} />
      <Text style={styles.acaoLabel}>Ação recomendada</Text>
      <Text style={styles.acao}>{cliente.acaoRecomendada}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E2E8F0', gap: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nome: { fontSize: 16, fontWeight: '700', color: '#0F172A', flex: 1, marginRight: 8 },
  probabilidade: { fontSize: 16, fontWeight: '800', color: '#DC2626' },
  meta: { fontSize: 13, color: '#475569' },
  acaoLabel: { fontSize: 12, color: '#334155', fontWeight: '700' },
  acao: { fontSize: 13, color: '#1E293B' },
});
