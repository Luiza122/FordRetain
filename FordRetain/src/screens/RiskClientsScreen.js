import { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import mockClients from '../data/mockClients';
import ClientCard from '../components/ClientCard';
import colors from '../styles/colors';

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

      <PrimaryButton title="Nova predição" onPress={() => navigation.navigate('Prediction')} />
      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontSize: 24, fontWeight: '700', color: colors.navy, marginBottom: 16 },
  listContent: { paddingBottom: 20 },
  separator: { height: 10 },
});
