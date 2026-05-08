import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';

function predictProfile(form) {
  const meses = Number(form.tempoUltimaRevisaoMeses || 0);
  const distancia = Number(form.distanciaKm || 0);
  const gasto = Number(form.valorGasto || 0);
  const visitas = Number(form.frequenciaVisitasAno || 0);

  let score = 0;
  score += meses >= 12 ? 40 : meses >= 8 ? 28 : meses >= 4 ? 14 : 6;
  score += form.garantiaStatus.toLowerCase().includes('venc') ? 20 : 8;
  score += distancia > 25 ? 18 : distancia > 15 ? 10 : 4;
  score += visitas <= 1 ? 12 : visitas <= 2 ? 6 : 2;
  score += gasto < 900 ? 10 : gasto < 1700 ? 5 : 2;

  const probabilidade = Math.max(10, Math.min(95, score));
  const risco = probabilidade >= 75 ? 'Alto' : probabilidade >= 50 ? 'Médio' : 'Baixo';
  const perfil = probabilidade >= 75 ? 'Cliente em Risco' : probabilidade >= 50 ? 'Cliente Econômico' : 'Cliente Fiel';
  const acaoRecomendada =
    risco === 'Alto' ? 'Contato preventivo imediato + pacote de manutenção' : risco === 'Médio' ? 'Cupom de revisão + lembrete automático' : 'Programa de fidelidade e prioridade no atendimento';

  return {
    perfil,
    probabilidade,
    risco,
    acaoRecomendada,
    explicacao:
      'Simulação acadêmica baseada em atraso de revisão, garantia, distância, frequência e gasto em serviços.',
  };
}

export default function PredictionScreen({ navigation }) {
  const [form, setForm] = useState({
    tempoUltimaRevisaoMeses: '',
    garantiaStatus: 'Vencida',
    distanciaKm: '',
    frequenciaVisitasAno: '',
    valorGasto: '',
  });
  const [result, setResult] = useState(null);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Classificação de Risco</Text>
      <Text style={styles.subtitle}>Preencha os dados e simule o perfil de risco de evasão (uso acadêmico).</Text>

      <TextInput style={styles.input} placeholder="Meses desde a última revisão" value={form.tempoUltimaRevisaoMeses} onChangeText={(v) => update('tempoUltimaRevisaoMeses', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Status da garantia (Ativa/Vencida)" value={form.garantiaStatus} onChangeText={(v) => update('garantiaStatus', v)} />
      <TextInput style={styles.input} placeholder="Distância da concessionária (km)" value={form.distanciaKm} onChangeText={(v) => update('distanciaKm', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Frequência de visitas ao ano" value={form.frequenciaVisitasAno} onChangeText={(v) => update('frequenciaVisitasAno', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Valor gasto em serviços (R$)" value={form.valorGasto} onChangeText={(v) => update('valorGasto', v)} keyboardType="numeric" />

      <PrimaryButton title="Prever Perfil" onPress={() => setResult(predictProfile(form))} />

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Resultado da simulação</Text>
          <Text style={styles.row}><Text style={styles.label}>Perfil previsto:</Text> {result.perfil}</Text>
          <Text style={styles.row}><Text style={styles.label}>Probabilidade:</Text> {result.probabilidade}%</Text>
          <Text style={styles.row}><Text style={styles.label}>Nível de risco:</Text> {result.risco}</Text>
          <Text style={styles.row}><Text style={styles.label}>Ação recomendada:</Text> {result.acaoRecomendada}</Text>
          <Text style={styles.row}><Text style={styles.label}>Explicação:</Text> {result.explicacao}</Text>
        </View>
      )}

      <PrimaryButton title="Voltar ao Dashboard" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: colors.background, flexGrow: 1, gap: 10 },
  title: { fontSize: 24, fontWeight: '800', color: colors.navy },
  subtitle: { color: colors.textGray },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, color: colors.navy },
  resultCard: { backgroundColor: colors.white, borderRadius: 12, borderWidth: 1, borderColor: colors.border, padding: 14, gap: 6 },
  resultTitle: { fontWeight: '800', color: colors.fordBlue },
  row: { color: '#1E293B', lineHeight: 20 },
  label: { fontWeight: '800', color: colors.navy },
});
