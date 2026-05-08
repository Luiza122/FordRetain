import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';
import { registerMockUser } from '../data/mockAuth';
import FeedbackModal from '../components/FeedbackModal';

const PROFILES = ['Gerente', 'Atendente'];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile, setProfile] = useState(PROFILES[0]);
  const [feedback, setFeedback] = useState({ visible: false, type: 'aviso', title: '', message: '', goToLogin: false });

  function openFeedback(type, title, message, goToLogin = false) {
    setFeedback({ visible: true, type, title, message, goToLogin });
  }

  function handleRegister() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password.trim() || !confirmPassword.trim() || !profile) {
      return openFeedback('aviso', 'Campos incompletos', 'Preencha todos os campos obrigatórios antes de continuar.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return openFeedback('erro', 'Cadastro não realizado', 'Digite um e-mail válido para concluir o cadastro.');
    }
    if (password.length < 6) {
      return openFeedback('erro', 'Cadastro não realizado', 'A senha deve ter pelo menos 6 caracteres.');
    }
    if (password !== confirmPassword) {
      return openFeedback('erro', 'Cadastro não realizado', 'Senha e confirmar senha precisam ser iguais.');
    }

    registerMockUser({ name, email: normalizedEmail, password, profile });
    openFeedback('sucesso', 'Cadastro realizado com sucesso', 'Agora você já pode acessar o FordRetain com suas credenciais.', true);
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Cadastre um usuário para acessar o FordRetain</Text>
        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#94A3B8" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#94A3B8" autoCapitalize="none" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#94A3B8" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirmar senha" placeholderTextColor="#94A3B8" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
        <Text style={styles.label}>Perfil</Text>
        <View style={styles.profileRow}>
          {PROFILES.map((item) => (
            <PrimaryButton key={item} title={item} variant={profile === item ? 'primary' : 'secondary'} onPress={() => setProfile(item)} />
          ))}
        </View>
        <PrimaryButton title="Cadastrar" onPress={handleRegister} />
        <PrimaryButton title="Voltar ao Login" variant="secondary" onPress={() => navigation.navigate('Login')} />
      </View>

      <FeedbackModal
        visible={feedback.visible}
        type={feedback.type}
        title={feedback.title}
        message={feedback.message}
        buttonText={feedback.goToLogin ? 'Ir para Login' : 'Entendi'}
        onButtonPress={() => {
          const next = feedback.goToLogin;
          setFeedback((prev) => ({ ...prev, visible: false, goToLogin: false }));
          if (next) navigation.navigate('Login', { registeredEmail: email.trim().toLowerCase(), registeredPassword: password });
        }}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 28, fontWeight: '700', color: colors.navy, marginBottom: 6 },
  subtitle: { color: colors.textGray, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 10, color: colors.navy },
  label: { color: colors.navy, fontWeight: '700', marginTop: 4, marginBottom: 2 },
  profileRow: { gap: 4, marginBottom: 4 },
});
