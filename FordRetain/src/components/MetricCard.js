import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

export default function MetricCard({ title, value, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {!!description && <Text style={styles.description}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderRadius: 14, borderWidth: 1, borderColor: '#D9E2EF', padding: 14, marginBottom: 10 },
  title: { color: '#334155', fontSize: 13, fontWeight: '600' },
  value: { color: colors.navy, fontSize: 28, fontWeight: '800', marginTop: 6 },
  description: { color: '#64748B', fontSize: 12, marginTop: 6, lineHeight: 18 },
});
