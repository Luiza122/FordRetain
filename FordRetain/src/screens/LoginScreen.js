import { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, Alert, KeyboardAvoidingView, Platform, StyleSheet, Animated } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { MOCK_CREDENTIALS } from '../data/mockAuth';
import colors from '../styles/colors';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(translateAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true }),
    ]).start();
  }, [fadeAnim, translateAnim]);

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return;
    }

    if (normalizedEmail !== MOCK_CREDENTIALS.email || password !== MOCK_CREDENTIALS.password) {
      Alert.alert('Credenciais inválidas', 'Use o login de teste informado na tela.');
      return;
    }

    navigation.replace('Dashboard');
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <Animated.View style={[styles.card, { opacity: fadeAnim, transform: [{ translateY: translateAnim }] }]}> 
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

        <PrimaryButton title="Entrar" onPress={handleLogin} />

        <Text style={styles.registerPrompt}>Ainda não tem conta?</Text>
        <PrimaryButton title="Criar conta" variant="secondary" onPress={() => navigation.navigate('Cadastro')} />

        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>Login de teste</Text>
          <Text style={styles.demoText}>E-mail: gerente@fordretain.com</Text>
          <Text style={styles.demoText}>Senha: 123456</Text>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.navy, justifyContent: 'center', padding: 16 },
  glowTop: {
    position: 'absolute',
    top: -130,
    right: -90,
    width: 300,
    height: 300,
    borderRadius: 999,
    backgroundColor: '#1E5AA844',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -140,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 999,
    backgroundColor: '#38BDF833',
  },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 32, fontWeight: '700', color: colors.navy, marginBottom: 6, letterSpacing: 0.4 },
  subtitle: { color: colors.textGray, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, marginBottom: 10, color: colors.navy, backgroundColor: '#F8FAFC' },
  registerPrompt: { color: colors.textGray, marginTop: 8, marginBottom: 2, textAlign: 'center', fontWeight: '600' },
  demoBox: { marginTop: 14, backgroundColor: colors.lightBlue, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#BFDBFE' },
  demoTitle: { color: colors.navy, fontWeight: '700', marginBottom: 4 },
  demoText: { color: colors.textGray },
});
