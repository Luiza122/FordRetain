import { FlatList, Text, View } from 'react-native';
import ClientCard from '../components/ClientCard';
import mockClients from '../data/mockClients';
import globalStyles from '../styles/globalStyles';

export default function RiskClientsScreen({ navigation }) {
  return (
    <View style={globalStyles.screen}>
      <FlatList
        data={mockClients}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={globalStyles.container}
        ListHeaderComponent={<><Text style={globalStyles.title}>Clientes em risco</Text><Text style={globalStyles.subtitle}>Lista ordenada do maior para o menor risco de evasão.</Text></>}
        renderItem={({ item }) => <ClientCard client={item} onPress={() => navigation.navigate('ClientDetails', { client: item })} />}
      />
    </View>
  );
}
