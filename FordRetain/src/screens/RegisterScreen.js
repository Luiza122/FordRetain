import { useEffect, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, Animated } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';

const PROFILES = ['Gerente', 'Atendente'];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profile, setProfile] = useState(PROFILES[0]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 450, useNativeDriver: true }).start();
  }, [fadeAnim]);

  function handleRegister() {
    const normalizedEmail = email.trim().toLowerCase();

    if (!name.trim() || !normalizedEmail || !password.trim() || !confirmPassword.trim() || !profile) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (!normalizedEmail.includes('@')) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'Senha e confirmar senha precisam ser iguais.');
      return;
    }

    Alert.alert(
      'Cadastro realizado com sucesso',
      'Agora você pode acessar o FordRetain com seu e-mail e senha.',
      [{ text: 'OK', onPress: () => navigation.navigate('Login') }],
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Animated.View style={[styles.card, { opacity: fadeAnim }]}> 
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
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, justifyContent: 'center', padding: 16 },
  card: { backgroundColor: colors.white, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.border },
  title: { fontSize: 28, fontWeight: '700', color: colors.navy, marginBottom: 6 },
  subtitle: { color: colors.textGray, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: colors.border, borderRadius: 12, padding: 12, marginBottom: 10, color: colors.navy, backgroundColor: '#F8FAFC' },
  label: { color: colors.navy, fontWeight: '700', marginTop: 4, marginBottom: 2 },
  profileRow: { gap: 4, marginBottom: 4 },
});
