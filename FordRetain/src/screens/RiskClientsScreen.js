import { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import mockClients from '../data/mockClients';
import ClientCard from '../components/ClientCard';

export default function RiskClientsScreen({ navigation }) {
  const clients = useMemo(() => [...mockClients].sort((a, b) => b.probabilidadeEvasao - a.probabilidadeEvasao), []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes em Risco</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: '#0F172A', marginBottom: 16 },
  listContent: { paddingBottom: 20 },
  separator: { height: 10 },
});
