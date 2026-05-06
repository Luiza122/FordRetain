import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, 
  Alert, KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { MOCK_CREDENTIALS } from '../data/mockAuth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      Alert.alert('Erro', 'Digite um email válido no formato nome@dominio.com.');
      return;
    }

    setLoading(true);

    if (
      normalizedEmail !== MOCK_CREDENTIALS.email ||
      password !== MOCK_CREDENTIALS.password
    ) {
      setLoading(false);
      Alert.alert('Credencial incorreta', 'Email ou senha não conferem. Tente novamente.');
      return;
    }

    setLoading(false);
    Alert.alert('Sucesso!', 'Login realizado com sucesso!', [
      { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
    ]);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.background}>
        <View style={styles.topDecor} />
        <View style={styles.bottomDecor} />
      </View>
      
      <View style={styles.inner}>
        <View style={styles.header}>
          <Text style={styles.icon}>🚗</Text>
          <Text style={styles.title}>FordRetain</Text>
          <Text style={styles.subtitle}>Retention Intelligence</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>📧</Text>
              <TextInput
                placeholder="seu@email.com"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!loading}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={[styles.inputWrapper, styles.passwordWrapper]}>
              <Text style={styles.inputIcon}>🔒</Text>
              <TextInput
                placeholder="Sua senha segura"
                placeholderTextColor="#94a3b8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                editable={!loading}
                style={styles.input}
              />
              <TouchableOpacity 
                onPress={() => setShowPassword(!showPassword)}
                disabled={loading}
                style={styles.eyeIcon}
              >
                <Text style={styles.eyeText}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.loginBtn, loading && styles.loginBtnDisabled]} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="large" />
            ) : (
              <>
                <Text style={styles.loginBtnIcon}>⚡</Text>
                <Text style={styles.loginBtnText}>ENTRAR</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('Profiles')} disabled={loading}>
            <Text style={styles.link}>Não tem conta? <Text style={styles.linkBold}>Criar conta</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Security')} disabled={loading}>
            <Text style={styles.link}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },

  background: {
    ...StyleSheet.absoluteFillObject,
  },

  topDecor: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },

  bottomDecor: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },

  inner: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },

  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },

  icon: {
    fontSize: 64,
    marginBottom: 12,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1,
  },

  subtitle: {
    fontSize: 14,
    color: '#60a5fa',
    marginTop: 8,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  formContainer: {
    gap: 20,
  },

  inputGroup: {
    gap: 8,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#e2e8f0',
    letterSpacing: 0.5,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderWidth: 1.5,
    borderColor: '#334155',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 54,
    gap: 10,
  },

  passwordWrapper: {
    justifyContent: 'space-between',
  },

  inputIcon: {
    fontSize: 20,
  },

  input: {
    flex: 1,
    color: '#f1f5f9',
    fontSize: 15,
    fontWeight: '500',
  },

  eyeIcon: {
    padding: 8,
  },

  eyeText: {
    fontSize: 18,
  },

  loginBtn: {
    backgroundColor: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 0,
    flexDirection: 'row',
    gap: 10,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 12,
    backgroundColor: '#3b82f6',
  },

  loginBtnDisabled: {
    backgroundColor: '#1e293b',
    opacity: 0.7,
  },

  loginBtnIcon: {
    fontSize: 20,
  },

  loginBtnText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },

  footer: {
    gap: 12,
    marginBottom: 20,
  },

  link: {
    color: '#94a3b8',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },

  linkBold: {
    color: '#60a5fa',
    fontWeight: 'bold',
  },
});