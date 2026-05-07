import { Pressable, StyleSheet, Text, View } from 'react-native';
import ProfileBadge from './ProfileBadge';
import colors from '../styles/colors';

export default function ClientCard({ client, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}><Text style={styles.name}>{client.nome}</Text><Text style={styles.risk}>{client.probabilidadeEvasao}%</Text></View>
      <Text style={styles.meta}>{client.modelo} • {client.ano} • {client.regiao}</Text>
      <ProfileBadge perfil={client.perfil} />
      <Text style={styles.action}>Ação: {client.acaoRecomendada}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 14, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  name: { fontSize: 16, fontWeight: '700', color: colors.navy },
  risk: { fontSize: 16, fontWeight: '700', color: colors.riskRed },
  meta: { color: colors.textGray, marginBottom: 8 },
  action: { marginTop: 8, color: colors.textGray, fontSize: 13 },
});
