import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, 
  KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { registerUser } from '../firebase/authService';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha nome, email e senha.');
      return;
    }

    try {
      await registerUser(email.trim(), password);
      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro ao cadastrar', error.message);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#64748b"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

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

        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerBtn}
        >
          <Text style={styles.registerBtnText}>Cadastrar</Text>
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
    marginBottom: 28,
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

  registerBtn: {
    backgroundColor: '#9333ea',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
    shadowColor: '#a855f7',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 8,
  },

  registerBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
});