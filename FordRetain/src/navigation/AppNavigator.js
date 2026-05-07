import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PredictionScreen from '../screens/PredictionScreen';
import ProfilesScreen from '../screens/ProfilesScreen';
import SecurityScreen from '../screens/SecurityScreen';
import AboutScreen from '../screens/AboutScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RiskClientsScreen from '../screens/RiskClientsScreen';
import LeadDetailsScreen from '../screens/LeadDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Painel' }} />
        <Stack.Screen
          name="RiskClients"
          component={RiskClientsScreen}
          options={{ title: 'Clientes em risco' }}
        />
        <Stack.Screen
          name="ClientDetails"
          component={LeadDetailsScreen}
          options={{ title: 'Detalhes do cliente' }}
        />
        <Stack.Screen
          name="Prediction"
          component={PredictionScreen}
          options={{ title: 'Previsão de churn' }}
        />
        <Stack.Screen name="Profiles" component={ProfilesScreen} options={{ title: 'Perfis' }} />
        <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Segurança' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Sobre' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
