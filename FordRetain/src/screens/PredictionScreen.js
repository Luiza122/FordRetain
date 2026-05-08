import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { predictCustomerProfile } from '../utils/predictionRules';
import colors from '../styles/colors';

export default function PredictionScreen({ navigation }) {
  const [form, setForm] = useState({ tempoUltimaRevisaoMeses: '', idadeVeiculoAnos: '', distanciaConcessionariaKm: '', frequenciaVisitasAno: '', garantiaStatus: 'Vencida', perfilBase: 'Cliente Econômico' });
  const [result, setResult] = useState(null);
  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Classificação de risco</Text>
      <Text style={styles.subtitle}>Simulação acadêmica para estimar risco de evasão no pós-venda Ford.</Text>
      <TextInput style={styles.input} placeholder="Tempo desde a última revisão (meses)" value={form.tempoUltimaRevisaoMeses} onChangeText={(v) => update('tempoUltimaRevisaoMeses', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Idade do veículo (anos)" value={form.idadeVeiculoAnos} onChangeText={(v) => update('idadeVeiculoAnos', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Distância da concessionária (km)" value={form.distanciaConcessionariaKm} onChangeText={(v) => update('distanciaConcessionariaKm', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Frequência de visitas por ano" value={form.frequenciaVisitasAno} onChangeText={(v) => update('frequenciaVisitasAno', v)} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Status da garantia (Ativa/Vencida)" value={form.garantiaStatus} onChangeText={(v) => update('garantiaStatus', v)} />
      <TextInput style={styles.input} placeholder="Perfil base" value={form.perfilBase} onChangeText={(v) => update('perfilBase', v)} />
      <PrimaryButton title="Prever perfil" onPress={() => setResult(predictCustomerProfile(form))} />
      {result && <View style={styles.card}><Text style={styles.cardTitle}>Resultado</Text><Text style={styles.text}>Perfil previsto: {result.perfil}</Text><Text style={styles.text}>Probabilidade: {result.probabilidade}%</Text><Text style={styles.text}>Nível de risco: {result.nivelRisco}</Text><Text style={styles.text}>Ação recomendada: {result.acaoRecomendada}</Text><Text style={styles.text}>Explicação: {result.explicacao}</Text></View>}
      <PrimaryButton title="Voltar" variant="secondary" onPress={() => navigation.navigate('Dashboard')} />
    </ScrollView>
  );
}
const styles=StyleSheet.create({container:{padding:16,backgroundColor:colors.background,flexGrow:1},title:{fontSize:24,fontWeight:'800',color:colors.navy},subtitle:{color:colors.textGray,marginTop:4,marginBottom:10},input:{backgroundColor:colors.white,borderWidth:1,borderColor:colors.border,borderRadius:10,padding:12,marginBottom:9,color:colors.navy},card:{backgroundColor:colors.white,borderColor:colors.border,borderWidth:1,borderRadius:12,padding:14,marginVertical:10},cardTitle:{fontWeight:'700',color:colors.navy,marginBottom:6},text:{color:'#334155',lineHeight:20}});
