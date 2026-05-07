import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RegisterScreen from '../screens/RegisterScreen';
import RiskClientsScreen from '../screens/RiskClientsScreen';
import ClientDetailsScreen from '../screens/ClientDetailsScreen';
import PredictionScreen from '../screens/PredictionScreen';
import ProfilesScreen from '../screens/ProfilesScreen';
import SecurityScreen from '../screens/SecurityScreen';
import AboutScreen from '../screens/AboutScreen';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: colors.primaryDark },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard Executivo' }} />
        <Stack.Screen name="RiskClients" component={RiskClientsScreen} options={{ title: 'Clientes em Risco' }} />
        <Stack.Screen name="ClientDetails" component={ClientDetailsScreen} options={{ title: 'Detalhes do Cliente' }} />
        <Stack.Screen name="Prediction" component={PredictionScreen} options={{ title: 'Predição de Cliente' }} />
        <Stack.Screen name="Profiles" component={ProfilesScreen} options={{ title: 'Perfis de Comportamento' }} />
        <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Segurança e Privacidade' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre o Projeto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
