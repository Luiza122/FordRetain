import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { getMockCredentials } from '../data/mockAuth';
import colors from '../styles/colors';
import FeedbackModal from '../components/FeedbackModal';

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = useState(route?.params?.registeredEmail || '');
  const [password, setPassword] = useState(route?.params?.registeredPassword || '');
  const [feedback, setFeedback] = useState({ visible: false, type: 'erro', title: '', message: '' });

  function showError(message) {
    setFeedback({ visible: true, type: 'erro', title: 'Login não realizado', message });
  }

  function handleLogin() {
    if (!email.trim() || !password.trim()) return showError('Verifique o e-mail e a senha informados.');
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return showError('Digite um e-mail válido para continuar.');

    const credentials = getMockCredentials();
    if (!credentials) {
      return showError('Nenhuma conta cadastrada. Crie uma conta para acessar o FordRetain.');
    }

    if (normalizedEmail !== credentials.email || password !== credentials.password) {
      return showError('Verifique o e-mail e a senha informados.');
    }

    navigation.replace('Home');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>
        <Text style={styles.title}>FordRetain</Text>
        <Text style={styles.subtitle}>Plataforma de retenção preditiva para veículos Ford</Text>

        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#94A3B8" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#94A3B8" secureTextEntry value={password} onChangeText={setPassword} />

        <PrimaryButton title="Entrar" onPress={handleLogin} />
        <Text style={styles.registerPrompt}>Ainda não tem conta?</Text>
        <PrimaryButton title="Criar conta" variant="secondary" onPress={() => navigation.navigate('Cadastro')} />
      </View>

      <FeedbackModal
        visible={feedback.visible}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        buttonText="Tentar novamente"
        onButtonPress={() => setFeedback((prev) => ({ ...prev, visible: false }))}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 30, fontWeight: '700', color: colors.navy, marginBottom: 6 },
  subtitle: { color: colors.textGray, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 10, color: colors.navy },
  registerPrompt: { color: colors.textGray, marginTop: 6, marginBottom: 2, textAlign: 'center', fontWeight: '600' },
});
