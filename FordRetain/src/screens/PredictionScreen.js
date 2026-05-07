import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const probabilitiesByProfile = {
  'Oficina Fidelizada': 0.18,
  'Sensível a Preço': 0.62,
  'Digital Engajado': 0.33,
  'Risco de Evasão': 0.79,
};

const actionsByProfile = {
  'Oficina Fidelizada': 'Oferecer pacote premium de manutenção e benefícios de fidelidade.',
  'Sensível a Preço': 'Disparar campanha com cupom e parcelamento de serviços essenciais.',
  'Digital Engajado': 'Ativar jornada omnichannel com lembretes e autoagendamento pelo app.',
  'Risco de Evasão': 'Abrir contato consultivo imediato com proposta personalizada.',
};

export default function PredictionScreen() {
  const [idade, setIdade] = useState('');
  const [regiao, setRegiao] = useState('Sudeste');
  const [modelo, setModelo] = useState('Ranger');
  const [pagamento, setPagamento] = useState('Cartão');
  const [canal, setCanal] = useState('App');
  const [historico, setHistorico] = useState('Revisões em dia, sem faltas');
  const [result, setResult] = useState(null);

  const explanation = useMemo(() => {
    if (!result) return '';
    return `A combinação de idade (${idade || 'n/i'}), região (${regiao}), modelo (${modelo}), forma de pagamento (${pagamento}), canal (${canal}) e histórico informado sugere comportamento compatível com o perfil ${result.perfil}.`;
  }, [result, idade, regiao, modelo, pagamento, canal]);

  function handlePredict() {
    const age = Number(idade);
    let perfil = 'Digital Engajado';

    if (historico.toLowerCase().includes('falt') || historico.toLowerCase().includes('atras')) {
      perfil = 'Risco de Evasão';
    } else if (pagamento.toLowerCase().includes('dinheiro') || pagamento.toLowerCase().includes('boleto')) {
      perfil = 'Sensível a Preço';
    } else if (age >= 45 && canal.toLowerCase().includes('concessionária')) {
      perfil = 'Oficina Fidelizada';
    }

    setResult({
      perfil,
      probabilidade: probabilitiesByProfile[perfil],
      acao: actionsByProfile[perfil],
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Predição de Perfil de Cliente</Text>

      <TextInput style={styles.input} placeholder="Idade" value={idade} onChangeText={setIdade} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Região" value={regiao} onChangeText={setRegiao} />
      <TextInput style={styles.input} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="Forma de pagamento" value={pagamento} onChangeText={setPagamento} />
      <TextInput style={styles.input} placeholder="Canal de relacionamento" value={canal} onChangeText={setCanal} />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Histórico de serviços"
        value={historico}
        onChangeText={setHistorico}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handlePredict}>
        <Text style={styles.buttonText}>Prever perfil</Text>
      </TouchableOpacity>

      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Resultado</Text>
          <Text style={styles.item}><Text style={styles.label}>Perfil:</Text> {result.perfil}</Text>
          <Text style={styles.item}><Text style={styles.label}>Probabilidade:</Text> {(result.probabilidade * 100).toFixed(1)}%</Text>
          <Text style={styles.item}><Text style={styles.label}>Ação recomendada:</Text> {result.acao}</Text>
          <Text style={styles.item}><Text style={styles.label}>Explicação:</Text> {explanation}</Text>
          <Text style={styles.warning}>Aviso: esta predição é demonstrativa e não substitui validação do modelo em produção.</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f8fafc', flexGrow: 1 },
  title: { fontSize: 20, fontWeight: '700', color: '#0f172a', marginBottom: 14 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  multiline: { minHeight: 72, textAlignVertical: 'top' },
  button: { backgroundColor: '#007AFF', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#fff', fontWeight: '700' },
  resultCard: { marginTop: 16, backgroundColor: '#fff', borderRadius: 10, padding: 14, borderWidth: 1, borderColor: '#dbeafe' },
  resultTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#1e3a8a' },
  item: { color: '#0f172a', marginBottom: 8 },
  label: { fontWeight: '700' },
  warning: { marginTop: 8, fontSize: 12, color: '#b45309' },
});
