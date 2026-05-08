import { Pressable, Text, View, StyleSheet } from 'react-native';
import ProfileBadge from './ProfileBadge';
import colors from '../styles/colors';

function getRiskStyle(risk) {
  if (risk >= 75) return styles.highRisk;
  if (risk >= 50) return styles.mediumRisk;
  return styles.lowRisk;
}

export default function ClientCard({ cliente, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(cliente)}>
      <View style={styles.rowBetween}>
        <Text style={styles.nome}>{cliente.nome}</Text>
        <Text style={[styles.riskBadge, getRiskStyle(cliente.riscoEvasao)]}>{cliente.riscoEvasao}%</Text>
      </View>
      <Text style={styles.meta}>{cliente.veiculo} • {cliente.ano} • Garantia {cliente.garantiaStatus}</Text>
      <ProfileBadge perfil={cliente.perfil} />
      <Text style={styles.acaoLabel}>Ação sugerida</Text>
      <Text style={styles.acao}>{cliente.acaoRecomendada}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: colors.border, gap: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nome: { fontSize: 16, fontWeight: '700', color: colors.navy, flex: 1, marginRight: 8 },
  riskBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, color: colors.white, fontWeight: '800' },
  highRisk: { backgroundColor: colors.riskRed },
  mediumRisk: { backgroundColor: colors.warningYellow },
  lowRisk: { backgroundColor: colors.successGreen },
  meta: { fontSize: 13, color: colors.textGray },
  acaoLabel: { fontSize: 12, color: colors.navy, fontWeight: '700' },
  acao: { fontSize: 13, color: '#1E293B' },
});
