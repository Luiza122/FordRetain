import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

export default function MetricCard({ title, value, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 10,
  },
  title: { color: '#334155', fontSize: 13, fontWeight: '600' },
  value: { color: colors.primaryDark, fontSize: 28, fontWeight: '700', marginTop: 6 },
  description: { color: '#64748B', fontSize: 12, marginTop: 6 },
});
