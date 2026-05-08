import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { getMockCredentials } from '../data/mockAuth';
import colors from '../styles/colors';

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState(route?.params?.registeredEmail || '');
  const [password, setPassword] = useState(route?.params?.registeredPassword || '');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  function showMessage(type, text) {
    setMessageType(type);
    setMessage(text);
  }

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      showMessage('error', 'Preencha e-mail e senha.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      showMessage('error', 'Digite um e-mail válido.');
      return;
    }

    const credentials = getMockCredentials();
    if (normalizedEmail !== credentials.email || password !== credentials.password) {
      showMessage('error', 'Credenciais inválidas. Use o login de teste ou o usuário cadastrado.');
      navigation.navigate('AuthStatus', {
        type: 'error',
        title: 'Login não autorizado',
        message: 'E-mail ou senha incorretos. Verifique os dados e tente novamente.',
        buttonLabel: 'Tentar novamente',
        nextRoute: 'Login',
      });
      return;
    }

    showMessage('success', 'Login realizado com sucesso. Redirecionando...');
    navigation.replace('Home');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>
        <Text style={styles.title}>FordRetain</Text>
        <Text style={styles.subtitle}>Plataforma de retenção preditiva para veículos Ford</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#94A3B8"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {message ? (
          <View style={[styles.messageBox, messageType === 'error' ? styles.errorBox : styles.successBox]}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        <PrimaryButton title="Entrar" onPress={handleLogin} />

        <Text style={styles.registerPrompt}>Ainda não tem conta?</Text>
        <PrimaryButton title="Criar conta" variant="secondary" onPress={() => navigation.navigate('Cadastro')} />

        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Login de teste</Text>
          <Text style={styles.demoText}>E-mail: gerente@fordretain.com</Text>
          <Text style={styles.demoText}>Senha: 123456</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 30, fontWeight: '700', color: colors.navy, marginBottom: 6 },
  subtitle: { color: colors.textGray, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 10, color: colors.navy },
  messageBox: { borderRadius: 10, padding: 10, marginBottom: 8 },
  errorBox: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5' },
  successBox: { backgroundColor: '#DCFCE7', borderWidth: 1, borderColor: '#86EFAC' },
  messageText: { color: colors.navy, fontWeight: '600' },
  registerPrompt: { color: colors.textGray, marginTop: 6, marginBottom: 2, textAlign: 'center', fontWeight: '600' },
  demoBox: { marginTop: 14, backgroundColor: colors.lightBlue, borderRadius: 10, padding: 12 },
  demoTitle: { color: colors.navy, fontWeight: '700', marginBottom: 4 },
  demoText: { color: colors.textGray },
});
