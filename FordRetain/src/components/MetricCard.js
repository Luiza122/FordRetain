import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

export default function MetricCard({ label, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '46%',
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  value: { fontSize: 22, fontWeight: '700', color: colors.navy },
  label: { fontSize: 13, color: colors.textGray, marginTop: 4 },
});
