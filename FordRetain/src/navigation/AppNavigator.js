import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RiskClientsScreen from '../screens/RiskClientsScreen';
import LeadDetailsScreen from '../screens/LeadDetailsScreen';
import PredictionScreen from '../screens/PredictionScreen';
import ProfilesScreen from '../screens/ProfilesScreen';
import SecurityScreen from '../screens/SecurityScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="RiskClients" component={RiskClientsScreen} options={{ title: 'Clientes em Risco' }} />
        <Stack.Screen name="ClientDetails" component={LeadDetailsScreen} options={{ title: 'Detalhes do Cliente' }} />
        <Stack.Screen name="Prediction" component={PredictionScreen} options={{ title: 'Predição de Cliente' }} />
        <Stack.Screen name="Profiles" component={ProfilesScreen} options={{ title: 'Perfis de Comportamento' }} />
        <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Segurança e Privacidade' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre o Projeto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
