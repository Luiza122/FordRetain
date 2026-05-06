import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, 
  Alert, KeyboardAvoidingView, Platform, StyleSheet, } from 'react-native';
import { loginUser } from '../firebase/authService';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }

    try {
      await loginUser(email.trim(), password);
      // Após login, direciona para o dashboard em vez da tela de produtos
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert('Erro ao entrar', error.message);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Bem-vindo</Text>
        <Text style={styles.subtitle}>Faça login para continuar</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#64748b"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.link}>Não tem conta? <Text style={styles.linkBold}>Criar conta</Text></Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EsqueciSenha')}>
          <Text style={styles.link}>Esqueci minha senha</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e102f',
  },

  inner: {
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#faf5ff',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: '#d8b4fe',
    textAlign: 'center',
    marginBottom: 34,
  },

  input: {
    backgroundColor: '#2e1065',
    borderWidth: 1.5,
    borderColor: '#7e22ce',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    color: '#faf5ff',
    fontSize: 15,
  },

  loginBtn: {
    backgroundColor: '#9333ea',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 22,
    shadowColor: '#a855f7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },

  loginBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },

  link: {
    color: '#d8b4fe',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 15,
  },

  linkBold: {
    color: '#f3e8ff',
    fontWeight: '800',
  },
});