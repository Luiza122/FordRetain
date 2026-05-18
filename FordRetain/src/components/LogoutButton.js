import PrimaryButton from './PrimaryButton';

export default function LogoutButton({ navigation }) {
  function handleLogout() {
    navigation.replace('Login');
  }

  return <PrimaryButton title="Sair e voltar ao Login" variant="secondary" onPress={handleLogout} />;
}
