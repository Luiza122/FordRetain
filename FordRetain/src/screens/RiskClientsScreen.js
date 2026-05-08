import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import mockClients from '../data/mockClients';
import ClientCard from '../components/ClientCard';
import colors from '../styles/colors';

const FILTERS = ['Todos', 'Alto', 'Médio', 'Baixo'];

export default function RiskClientsScreen({ navigation }) {
  const [riskFilter, setRiskFilter] = useState('Todos');

  const clients = useMemo(() => {
    const sorted = [...mockClients].sort((a, b) => b.riscoEvasao - a.riscoEvasao);
    if (riskFilter === 'Todos') return sorted;
    if (riskFilter === 'Alto') return sorted.filter((c) => c.riscoEvasao >= 75);
    if (riskFilter === 'Médio') return sorted.filter((c) => c.riscoEvasao >= 50 && c.riscoEvasao < 75);
    return sorted.filter((c) => c.riscoEvasao < 50);
  }, [riskFilter]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes Priorizados por Risco</Text>
      <Text style={styles.subtitle}>A priorização aumenta a produtividade do consultor e reduz evasão no pós-venda.</Text>

      <View style={styles.filters}>
        {FILTERS.map((item) => (
          <View key={item} style={styles.filterButton}>
            <PrimaryButton title={item} variant={riskFilter === item ? 'primary' : 'secondary'} onPress={() => setRiskFilter(item)} />
          </View>
        ))}
      </View>

      <FlatList
        data={clients}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ClientCard
            cliente={item}
            onPress={(cliente) => navigation.navigate('ClientDetails', { client: cliente })}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />

      <PrimaryButton title="Voltar ao dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontSize: 24, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray, marginBottom: 10 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 },
  filterButton: { width: '48%', marginRight: '2%' },
  listContent: { paddingBottom: 14 },
  separator: { height: 10 },
});
