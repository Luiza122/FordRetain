import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import RoleGuard from '../components/RoleGuard';
import colors from '../styles/colors';
import { predictClientProfile } from '../services/api';

const initialForm = {
  idade: '',
  regiao: 'Sudeste',
  modelo: 'Ford Ranger',
  formaPagamento: 'Financiamento',
  canalCompra: 'Concessionária',
  historicoMarca: 'Primeiro Ford',
};

export default function PredictionScreen({ navigation }) {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  async function handlePredict() {
    setLoading(true);
    try {
      const prediction = await predictClientProfile(form);
      setResult(prediction);
    } finally {
      setLoading(false);
    }
  }

  return (
    <RoleGuard
      navigation={navigation}
      allowedProfiles={['Gerente']}
      message="A classificação preditiva é exclusiva para o perfil Gerente, pois simula a previsão estratégica de novos clientes."
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Classificação Preditiva</Text>
        <Text style={styles.subtitle}>Simulação do endpoint POST /predict usando somente dados disponíveis no momento da compra.</Text>

        <View style={styles.warningBox}>
          <Text style={styles.warningTitle}>Regra anti data leakage</Text>
          <Text style={styles.warningText}>Esta tela não usa revisões feitas, gastos, garantia vencida, última revisão ou frequência de visitas. A previsão considera apenas dados conhecidos na venda.</Text>
        </View>

        <TextInput style={styles.input} placeholder="Idade do cliente" value={form.idade} onChangeText={(v) => update('idade', v)} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="Região" value={form.regiao} onChangeText={(v) => update('regiao', v)} />
        <TextInput style={styles.input} placeholder="Modelo do veículo" value={form.modelo} onChangeText={(v) => update('modelo', v)} />
        <TextInput style={styles.input} placeholder="Forma de pagamento" value={form.formaPagamento} onChangeText={(v) => update('formaPagamento', v)} />
        <TextInput style={styles.input} placeholder="Canal de compra" value={form.canalCompra} onChangeText={(v) => update('canalCompra', v)} />
        <TextInput style={styles.input} placeholder="Histórico com a marca" value={form.historicoMarca} onChangeText={(v) => update('historicoMarca', v)} />

        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={colors.fordBlue} />
            <Text style={styles.loadingText}>Enviando dados para a API simulada...</Text>
          </View>
        ) : (
          <PrimaryButton title="Prever Perfil" onPress={handlePredict} />
        )}

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Resultado da classificação</Text>
            <Text style={styles.row}><Text style={styles.label}>Perfil previsto:</Text> {result.perfil}</Text>
            <Text style={styles.row}><Text style={styles.label}>Probabilidade:</Text> {result.probabilidade}%</Text>
            <Text style={styles.row}><Text style={styles.label}>Nível de risco:</Text> {result.risco}</Text>
            <Text style={styles.row}><Text style={styles.label}>Ação recomendada:</Text> {result.acaoRecomendada}</Text>
            <Text style={styles.row}><Text style={styles.label}>Variáveis usadas:</Text> {result.variaveisUtilizadas.join(', ')}</Text>
            <Text style={styles.row}><Text style={styles.label}>Explicação:</Text> {result.explicacao}</Text>
          </View>
        )}

        <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
      </ScrollView>
    </RoleGuard>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1, gap: 10 },
  title: { fontSize: 24, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray },
  warningBox: { backgroundColor: '#FFFBEB', borderColor: '#FCD34D', borderWidth: 1, borderRadius: 12, padding: 12 },
  warningTitle: { color: colors.navy, fontWeight: '800', marginBottom: 4 },
  warningText: { color: '#334155', lineHeight: 20 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, color: colors.navy },
  loadingBox: { backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 14, alignItems: 'center' },
  loadingText: { color: colors.textGray, marginTop: 8, fontWeight: '600' },
  resultCard: { backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 6 },
  resultTitle: { fontWeight: '800', color: colors.fordBlue },
  row: { color: '#1E293B', lineHeight: 20 },
  label: { fontWeight: '800', color: colors.navy },
});
