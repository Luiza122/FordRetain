import { View, Text, StyleSheet } from 'react-native';

export default function MetricCard({ title, value }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  title: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
  },
});
