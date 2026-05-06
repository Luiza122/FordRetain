import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { getDashboard } from '../api/clientService';

/**
 * Tela de dashboard que exibe métricas de VIN Share.
 * Ao carregar, solicita dados da API e apresenta métricas gerais,
 * por região e por modelo. Também oferece um botão para acessar
 * a lista de clientes em risco.
 */
export default function DashboardScreen({ navigation }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const data = await getDashboard();
        setMetrics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

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
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard VIN Share</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {metrics && (
        <>
          <Text style={styles.sectionTitle}>VIN Share geral</Text>
          <Text style={styles.metricValue}>
            {(metrics.overallVinShare * 100).toFixed(1)}%
          </Text>
          <Text style={styles.sectionTitle}>VIN Share por região</Text>
          {Object.entries(metrics.vinShareByRegion).map(([region, value]) => (
            <Text key={region} style={styles.metricItem}>
              {region}: {(value * 100).toFixed(1)}%
            </Text>
          ))}
          <Text style={styles.sectionTitle}>VIN Share por modelo</Text>
          {Object.entries(metrics.vinShareByModel).map(([model, value]) => (
            <Text key={model} style={styles.metricItem}>
              {model}: {(value * 100).toFixed(1)}%
            </Text>
          ))}
        </>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Leads')}
      >
        <Text style={styles.buttonText}>Ver clientes em risco</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8fafc',
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  logoutBtn: {
    padding: 8,
  },
  logoutText: {
    color: 'blue',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  metricItem: {
    fontSize: 14,
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 6,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
});