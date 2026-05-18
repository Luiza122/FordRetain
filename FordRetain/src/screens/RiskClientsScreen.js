import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AuthGuard from '../components/AuthGuard';
import ClientCard from '../components/ClientCard';
import colors from '../styles/colors';
import { getLeads } from '../services/api';

const FILTERS = ['Todos', 'Alto', 'Médio', 'Baixo'];

export default function RiskClientsScreen({ navigation }) {
  const [riskFilter, setRiskFilter] = useState('Todos');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeads() {
      try {
        const data = await getLeads();
        setLeads(data);
      } finally {
        setLoading(false);
      }
    }

    loadLeads();
  }, []);

  const clients = useMemo(() => {
    if (riskFilter === 'Todos') return leads;
    return leads.filter((client) => client.nivelRisco === riskFilter);
  }, [leads, riskFilter]);

  if (loading) {
    return (
      <AuthGuard navigation={navigation}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.fordBlue} />
          <Text style={styles.loadingText}>Buscando leads priorizados na API...</Text>
        </View>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard navigation={navigation}>
      <View style={styles.container}>
      <Text style={styles.title}>Clientes Priorizados por Risco</Text>
      <Text style={styles.subtitle}>Dados carregados de forma assíncrona pelo endpoint simulado GET /leads.</Text>

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
        ListEmptyComponent={<Text style={styles.empty}>Nenhum cliente encontrado para este filtro.</Text>}
      />

      <PrimaryButton title="Voltar ao dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
      </View>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background, padding: 18 },
  loadingText: { marginTop: 10, color: colors.textGray, fontWeight: '600', textAlign: 'center' },
  title: { fontSize: 24, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray, marginBottom: 10 },
  filters: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 6 },
  filterButton: { width: '48%', marginRight: '2%' },
  listContent: { paddingBottom: 14 },
  separator: { height: 10 },
  empty: { textAlign: 'center', color: colors.textGray, marginTop: 20, fontWeight: '600' },
});
