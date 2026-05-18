import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import AppLogo from '../components/AppLogo';
import { authenticateMockUser } from '../data/mockAuth';
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

    const user = authenticateMockUser(normalizedEmail, password);
    if (!user) return showError('Verifique o e-mail e a senha cadastrados.');

    navigation.replace('Home');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>
        <AppLogo />
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Acesse o FordRetain para acompanhar clientes, riscos e ações de retenção.</Text>

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
  container: { flex: 1, backgroundColor: colors.navy, justifyContent: 'center', alignItems: 'center', padding: 18 },
  card: { width: '100%', maxWidth: 540, backgroundColor: colors.white, borderRadius: 28, padding: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.45)', shadowColor: colors.shadow, shadowOpacity: 0.22, shadowRadius: 24, shadowOffset: { width: 0, height: 12 }, elevation: 7 },
  title: { fontSize: 30, fontWeight: '900', color: colors.navy, marginTop: 18, marginBottom: 6, textAlign: 'center' },
  subtitle: { color: colors.textGray, marginBottom: 18, lineHeight: 21, textAlign: 'center', fontWeight: '600' },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 16, padding: 14, marginBottom: 10, color: colors.navy, backgroundColor: colors.surfaceSoft },
  registerPrompt: { color: colors.textGray, marginTop: 10, marginBottom: 2, textAlign: 'center', fontWeight: '800' },
});
