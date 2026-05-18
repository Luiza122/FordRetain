import { useState } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
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
    if (!user) {
      return showError('Verifique o e-mail, a senha e o perfil cadastrado.');
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

        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Login de teste</Text>
          <Text style={styles.demoText}>E-mail: gerente@fordretain.com</Text>
          <Text style={styles.demoText}>Senha: 123456</Text>
        </View>
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
  demoBox: { backgroundColor: colors.lightBlue, borderRadius: 12, borderWidth: 1, borderColor: '#BFDBFE', padding: 12, marginTop: 10 },
  demoTitle: { color: colors.navy, fontWeight: '800', marginBottom: 4 },
  demoText: { color: '#334155', fontWeight: '600' },
});
