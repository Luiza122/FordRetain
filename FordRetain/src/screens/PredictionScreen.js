import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { predictClientProfile } from '../utils/predictionRules';
import globalStyles from '../styles/globalStyles';
import ProfileBadge from '../components/ProfileBadge';

export default function PredictionScreen() {
  const [form, setForm] = useState({ idade: '35', regiao: 'Sudeste', modelo: 'Ford Ranger', formaPagamento: 'Financiamento longo', canalCompra: 'Concessionária', historicoMarca: 'Primeiro Ford' });
  const [result, setResult] = useState(null);
  const field = (k, p) => <TextInput style={styles.input} placeholder={p} value={form[k]} onChangeText={(v)=>setForm({ ...form, [k]: v })}/>;
  return <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.container}><Text style={globalStyles.title}>Predição de cliente</Text><View style={globalStyles.card}>{field('idade','Idade')}{field('regiao','Região')}{field('modelo','Modelo do veículo')}{field('formaPagamento','Forma de pagamento')}{field('canalCompra','Canal de compra')}{field('historicoMarca','Histórico com a marca')}<PrimaryButton title='Prever perfil' onPress={()=>setResult(predictClientProfile(form))}/></View>{result && <View style={globalStyles.card}><Text style={styles.resultTitle}>Resultado da predição</Text><ProfileBadge perfil={result.perfil}/><Text>Probabilidade: {result.probabilidade}%</Text><Text>Ação: {result.acaoRecomendada}</Text><Text>Regra aplicada: {result.explicacao}</Text></View>}</ScrollView>;
}
const styles = StyleSheet.create({ input:{borderWidth:1,borderRadius:10,padding:12,marginBottom:8,borderColor:'#D9E2F2'}, resultTitle:{fontSize:16,fontWeight:'700',marginBottom:8} });
