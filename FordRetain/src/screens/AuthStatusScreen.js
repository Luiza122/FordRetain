import { StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';

export default function AuthStatusScreen({ route, navigation }) {
  const {
    type = 'success',
    title = 'Operação concluída',
    message = 'A operação foi finalizada.',
    buttonLabel = 'Continuar',
    nextRoute = 'Login',
    params,
  } = route.params || {};

  const isError = type === 'error';

  return (
    <View style={styles.container}>
      <View style={[styles.iconCircle, isError ? styles.errorCircle : styles.successCircle]}>
        <Text style={styles.iconText}>{isError ? '!' : '✓'}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      <PrimaryButton title={buttonLabel} onPress={() => navigation.navigate(nextRoute, params)} />
      <PrimaryButton title="Voltar ao Login" variant="secondary" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 20,
    gap: 12,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successCircle: {
    backgroundColor: '#DCFCE7',
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  errorCircle: {
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
    borderColor: '#EF4444',
  },
  iconText: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.navy,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.navy,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: colors.textGray,
    textAlign: 'center',
    maxWidth: 420,
  },
});
