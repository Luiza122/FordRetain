import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';
import { registerMockUser } from '../data/mockAuth';

const PROFILES = ['Gerente', 'Atendente'];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile, setProfile] = useState(PROFILES[0]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('info');

  function showMessage(type, text) {
    setMessageType(type);
    setMessage(text);
  }

  function handleRegister() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password.trim() || !confirmPassword.trim() || !profile) {
      showMessage('error', 'Preencha todos os campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      showMessage('error', 'Digite um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      showMessage('error', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      showMessage('error', 'Senha e confirmar senha precisam ser iguais.');
      return;
    }

    registerMockUser({ name, email: normalizedEmail, password, profile });
    showMessage('success', 'Cadastro concluído com sucesso. Você será redirecionado para o login.');

    navigation.navigate('Login', {
      registeredEmail: normalizedEmail,
      registeredPassword: password,
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.card}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Cadastre um usuário para acessar o FordRetain</Text>

        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#94A3B8" value={name} onChangeText={setName} />
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
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#94A3B8"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {message ? (
          <View style={[styles.messageBox, messageType === 'error' ? styles.errorBox : styles.successBox]}>
            <Text style={styles.messageText}>{message}</Text>
          </View>
        ) : null}

        <Text style={styles.label}>Perfil</Text>
        <View style={styles.profileRow}>
          {PROFILES.map((item) => (
            <PrimaryButton
              key={item}
              title={item}
              variant={profile === item ? 'primary' : 'secondary'}
              onPress={() => setProfile(item)}
            />
          ))}
        </View>

        <PrimaryButton title="Cadastrar" onPress={handleRegister} />
        <PrimaryButton title="Voltar ao Login" variant="secondary" onPress={() => navigation.navigate('Login')} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 14, padding: 18, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 28, fontWeight: '700', color: colors.navy, marginBottom: 6 },
  subtitle: { color: colors.textGray, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 10, color: colors.navy },
  messageBox: { borderRadius: 10, padding: 10, marginBottom: 8 },
  errorBox: { backgroundColor: '#FEE2E2', borderWidth: 1, borderColor: '#FCA5A5' },
  successBox: { backgroundColor: '#DCFCE7', borderWidth: 1, borderColor: '#86EFAC' },
  messageText: { color: colors.navy, fontWeight: '600' },
  label: { color: colors.navy, fontWeight: '700', marginTop: 4, marginBottom: 2 },
  profileRow: { gap: 4, marginBottom: 4 },
});
