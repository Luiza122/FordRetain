import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { predictCustomerProfile } from '../utils/predictionRules';
import colors from '../styles/colors';

export default function PredictionScreen({ navigation }) {
  const [form, setForm] = useState({
    idade: '',
    regiao: 'Sudeste',
    modelo: 'Ford Ranger',
    formaPagamento: 'Financiamento',
    canalCompra: 'Concessionária',
    historicoMarca: 'Primeiro Ford',
  });
  const [result, setResult] = useState(null);

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handlePredict() {
    setResult(predictCustomerProfile(form));
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Classificação de Risco</Text>
      <Text style={styles.subtitle}>Preencha os dados para simular o risco de evasão.</Text>

      <TextInput style={styles.input} placeholder="Idade" value={form.idade} onChangeText={(v) => update('idade', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Região" value={form.regiao} onChangeText={(v) => update('regiao', v)} />
      <TextInput style={styles.input} placeholder="Modelo do veículo" value={form.modelo} onChangeText={(v) => update('modelo', v)} />
      <TextInput style={styles.input} placeholder="Forma de pagamento" value={form.formaPagamento} onChangeText={(v) => update('formaPagamento', v)} />
      <TextInput style={styles.input} placeholder="Canal de compra" value={form.canalCompra} onChangeText={(v) => update('canalCompra', v)} />
      <TextInput style={styles.input} placeholder="Histórico com a marca" value={form.historicoMarca} onChangeText={(v) => update('historicoMarca', v)} />

      <PrimaryButton title="Prever perfil" onPress={handlePredict} />

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Resultado da predição</Text>
          <Text style={styles.row}><Text style={styles.label}>Perfil previsto:</Text> {result.perfil}</Text>
          <Text style={styles.row}><Text style={styles.label}>Probabilidade simulada:</Text> {result.probabilidade}%</Text>
          <Text style={styles.row}><Text style={styles.label}>Ação recomendada:</Text> {result.acaoRecomendada}</Text>
          <Text style={styles.row}><Text style={styles.label}>Explicação:</Text> {result.explicacao}</Text>
          <Text style={styles.warning}>Predição demonstrativa baseada em dados do momento da compra.</Text>
        </View>
      )}

      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1, gap: 10 },
  title: { fontSize: 24, fontWeight: '700', color: colors.navy },
  subtitle: { color: colors.textGray, marginBottom: 8 },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: colors.navy,
  },
  resultCard: { backgroundColor: colors.white, marginTop: 8, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 8 },
  resultTitle: { fontWeight: '700', fontSize: 16, color: colors.fordBlue },
  row: { color: '#1E293B', lineHeight: 20 },
  label: { fontWeight: '700' },
  warning: { color: '#B45309', marginTop: 4, fontSize: 12 },
});
