import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import colors from '../styles/colors';
import { getMockCredentials, logoutMockUser } from '../data/mockAuth';

export default function RoleGuard({ allowedProfiles, navigation, children, message }) {
  const user = getMockCredentials();
  const hasAccess = user && allowedProfiles.includes(user.profile);

  function goToLogin() {
    logoutMockUser();
    navigation.replace('Login');
  }

  if (hasAccess) return children;

  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Sessão expirada</Text>
          <Text style={styles.message}>
            Não encontramos um usuário logado. Faça login novamente para recuperar o perfil correto.
          </Text>
          <PrimaryButton title="Voltar ao Login" onPress={goToLogin} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Acesso restrito</Text>
        <Text style={styles.message}>
          {message || 'Esta tela está disponível apenas para perfis autorizados.'}
        </Text>
        <Text style={styles.profile}>Perfil atual: {user.profile}</Text>
        <PrimaryButton title="Ir para clientes" onPress={() => navigation.navigate('Clients')} />
        <PrimaryButton title="Voltar para Home" variant="secondary" onPress={() => navigation.navigate('Home')} />
        <PrimaryButton title="Sair e voltar ao Login" variant="secondary" onPress={goToLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16, justifyContent: 'center' },
  card: { backgroundColor: colors.white, borderRadius: 16, borderWidth: 1, borderColor: colors.border, padding: 18 },
  title: { color: colors.navy, fontSize: 24, fontWeight: '800', marginBottom: 8 },
  message: { color: '#334155', lineHeight: 21, marginBottom: 8 },
  profile: { color: colors.fordBlue, fontWeight: '800', marginBottom: 10 },
});
