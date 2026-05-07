import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, 
  KeyboardAvoidingView, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import { registerUser, loginUser } from '../firebase/authService';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleRegister() {
    console.log('=== HANDLE REGISTER CHAMADO ===');
    console.log('Name:', name, 'Trimmed:', name.trim());
    console.log('Email:', email, 'Trimmed:', email.trim());
    console.log('Password:', password ? '***' : 'vazio');
    console.log('ConfirmPassword:', confirmPassword ? '***' : 'vazio');
    
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      console.log('Campos vazios detectados');
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (password.length < 6) {
      console.log('Senha muito curta');
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Senhas não coincidem');
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      console.log('Iniciando registro com email:', email);
      await registerUser(email.trim(), password);
      console.log('Registro OK, fazendo login...');
      await loginUser(email.trim(), password);
      console.log('Login OK, redirecionando...');
      setLoading(false);
      Alert.alert('Sucesso!', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
      ]);
    } catch (error) {
      setLoading(false);
      console.error('Erro completo:', error);
      console.error('Tipo de erro:', error.constructor.name);
      console.error('Message:', error.message);
      Alert.alert('Erro', error.message || 'Falha ao cadastrar. Tente novamente.');
    }
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
          <Text style={styles.icon}>FR</Text>
          <Text style={styles.title}>FordRetain</Text>
          <Text style={styles.subtitle}>Crie sua conta</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome Completo</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>N</Text>
              <TextInput
                placeholder="Seu nome"
                placeholderTextColor="#94a3b8"
                value={name}
                onChangeText={setName}
                editable={!loading}
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>@</Text>
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
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>•</Text>
              <TextInput
                placeholder="Mínimo 6 caracteres"
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
                <Text style={styles.eyeText}>{showPassword ? 'Ocultar' : 'Mostrar'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirme a Senha</Text>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>•</Text>
              <TextInput
                placeholder="Confirme sua senha"
                placeholderTextColor="#94a3b8"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                editable={!loading}
                style={styles.input}
              />
              <TouchableOpacity 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={loading}
                style={styles.eyeIcon}
              >
                <Text style={styles.eyeText}>{showConfirmPassword ? 'Ocultar' : 'Mostrar'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            style={[styles.registerBtn, loading && styles.registerBtnDisabled]}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" size="large" />
            ) : (
              <>
                <Text style={styles.registerBtnIcon}></Text>
                <Text style={styles.registerBtnText}>CADASTRAR</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
            <Text style={styles.link}>Já tem conta? <Text style={styles.linkBold}>Fazer login</Text></Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
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
    backgroundColor: '#1E5AA833',
  },

  bottomDecor: {
    position: 'absolute',
    bottom: -150,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#47556933',
  },

  inner: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },

  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },

  icon: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    letterSpacing: 1,
  },

  subtitle: {
    ...globalStyles.subtitle,
    marginTop: 4,
  },

  formContainer: {
    gap: 14,
  },

  inputGroup: {
    gap: 6,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryLight,
    letterSpacing: 0.5,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B1F3ACC',
    borderWidth: 1.5,
    borderColor: colors.slate,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },

  inputIcon: {
    fontSize: 18,
  },

  input: {
    flex: 1,
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },

  eyeIcon: {
    padding: 6,
  },

  eyeText: {
    fontSize: 16,
  },

  registerBtn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    flexDirection: 'row',
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 10,
  },

  registerBtnDisabled: {
    backgroundColor: colors.slate,
    opacity: 0.7,
  },

  registerBtnIcon: {
    fontSize: 18,
  },

  registerBtnText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },

  footer: {
    marginBottom: 16,
  },

  link: {
    textAlign: 'center',
    color: colors.slate,
    fontSize: 13,
    fontWeight: '500',
  },

  linkBold: {
    fontWeight: 'bold',
    color: colors.primaryLight,
  },
});