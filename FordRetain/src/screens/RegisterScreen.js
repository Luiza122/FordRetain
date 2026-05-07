import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';

export default function RegisterScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');

  function handleRegister() {
    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmacao.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos do cadastro.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmacao) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }

    Alert.alert('Cadastro realizado', 'Conta criada com sucesso no FordRetain.', [
      { text: 'Voltar ao login', onPress: () => navigation.navigate('Login') },
    ]);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>
        <Text style={styles.title}>Cadastro FordRetain</Text>
        <Text style={styles.subtitle}>Crie seu acesso para acompanhar retenção e VIN Share.</Text>

        <TextInput style={styles.input} placeholder="Nome completo" value={nome} onChangeText={setNome} />
        <TextInput style={styles.input} placeholder="E-mail" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={senha} onChangeText={setSenha} />
        <TextInput style={styles.input} placeholder="Confirmar senha" secureTextEntry value={confirmacao} onChangeText={setConfirmacao} />

        <TouchableOpacity style={styles.primaryButton} onPress={handleRegister}>
          <Text style={styles.primaryText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.secondaryText}>Voltar ao login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.primaryDark, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' },
  title: { fontSize: 26, fontWeight: '700', color: colors.primaryDark, marginBottom: 6 },
  subtitle: { color: colors.slate, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 12, marginBottom: 10, color: '#0F172A' },
  primaryButton: { backgroundColor: colors.primary, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 4 },
  primaryText: { color: colors.white, fontWeight: '700' },
  secondaryButton: { borderWidth: 1, borderColor: colors.primary, borderRadius: 10, padding: 12, alignItems: 'center', marginTop: 10 },
  secondaryText: { color: colors.primary, fontWeight: '700' },
});
