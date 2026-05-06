import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert,
  KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { resetUserPassword } from '../firebase/authService';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  async function handleResetPassword() {
    if (!email.trim()) {
      if (Platform.OS === 'web') {
        alert('Informe seu email.');
      } else {
        Alert.alert('Atenção', 'Informe seu email.');
      }
      return;
    }

    try {
      await resetUserPassword(email.trim());

      if (Platform.OS === 'web') {
        alert('Enviamos as instruções para seu email.');
      } else {
        Alert.alert(
          'Email enviado',
          'Enviamos as instruções de recuperação de senha para seu email.'
        );
      }

      navigation.goBack();
    } catch (error) {
      if (Platform.OS === 'web') {
        alert(error.message);
      } else {
        Alert.alert('Erro ao enviar email', error.message);
      }
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>Recuperar senha</Text>
        <Text style={styles.subtitle}>
          Informe seu email para receber as instruções
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
        />

        <TouchableOpacity style={styles.resetBtn} onPress={handleResetPassword}>
          <Text style={styles.resetBtnText}>Enviar email</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Voltar para login</Text>
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
    fontSize: 30,
    fontWeight: '800',
    color: '#faf5ff',
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#d8b4fe',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },

  input: {
    backgroundColor: '#2e1065',
    borderWidth: 1.5,
    borderColor: '#7e22ce',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    color: '#faf5ff',
    fontSize: 15,
  },

  resetBtn: {
    backgroundColor: '#9333ea',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
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

  resetBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },

  link: {
    color: '#e9d5ff',
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '600',
  },
});