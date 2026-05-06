import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { getLeads } from '../api/clientService';

/**
 * Tela que lista os clientes em risco de evasão. Cada item exibe o nome,
 * a probabilidade e o perfil do cliente. O badge de cor varia conforme o
 * perfil. Ao tocar em um item, o usuário é levado à tela de detalhes.
 */
export default function LeadsScreen({ navigation }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const data = await getLeads();
        setLeads(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLeads();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ClientDetails', { lead: item })}
        style={[styles.item, getBadgeStyle(item.profile)]}
      >
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.prob}>{Math.round(item.probability * 100)}%</Text>
        </View>
        <Text style={styles.profile}>{item.profile}</Text>
      </TouchableOpacity>
    );
  };

  function getBadgeStyle(profile) {
    switch (profile) {
      case 'Economico':
        return { backgroundColor: '#FDE68A' };
      case 'Esquecido':
        return { backgroundColor: '#BFDBFE' };
      case 'Abandono':
        return { backgroundColor: '#FCA5A5' };
      case 'Fiel':
        return { backgroundColor: '#A7F3D0' };
      default:
        return {};
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clientes em risco</Text>
      <FlatList
        data={leads}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e293b',
  },
  item: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    flex: 1,
  },
  prob: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#dc2626',
    marginLeft: 12,
  },
  profile: {
    fontSize: 13,
    color: '#475569',
    fontWeight: '600',
  },
  separator: {
    height: 8,
  },
});