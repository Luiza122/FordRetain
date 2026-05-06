import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import DashboardScreen from '../screens/DashboardScreen';
import LeadsScreen from '../screens/LeadsScreen';
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
          component={LeadsScreen}
          options={{ title: 'Clientes em risco' }}
        />
        <Stack.Screen
          name="ClientDetails"
          component={LeadDetailsScreen}
          options={{ title: 'Detalhes do cliente' }}
        />
        <Stack.Screen
          name="Prediction"
          component={DashboardScreen}
          options={{ title: 'Previsão de churn' }}
        />
        <Stack.Screen name="Profiles" component={RegisterScreen} options={{ title: 'Perfis' }} />
        <Stack.Screen name="Security" component={ForgotPasswordScreen} options={{ title: 'Segurança' }} />
        <Stack.Screen name="About" component={DashboardScreen} options={{ title: 'Sobre' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
