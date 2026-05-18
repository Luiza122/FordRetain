import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';
import colors from '../styles/colors';
import { getMockCredentials } from '../data/mockAuth';

export default function RoleGuard({ allowedProfiles, navigation, children, message }) {
  const user = getMockCredentials();
  const hasAccess = user && allowedProfiles.includes(user.profile);

  if (hasAccess) return children;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Acesso restrito</Text>
        <Text style={styles.message}>
          {message || 'Esta tela está disponível apenas para perfis autorizados.'}
        </Text>
        <Text style={styles.profile}>Perfil atual: {user?.profile || 'não identificado'}</Text>
        <PrimaryButton title="Ir para clientes" onPress={() => navigation.navigate('Clients')} />
        <PrimaryButton title="Voltar para Home" variant="secondary" onPress={() => navigation.navigate('Home')} />
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
