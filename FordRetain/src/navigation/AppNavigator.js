import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import BarcodeScannerScreen from '../screens/BarcodeScannerScreen';

// Novas telas para a plataforma FordRetain
import DashboardScreen from '../screens/DashboardScreen';
import LeadsScreen from '../screens/LeadsScreen';
import LeadDetailsScreen from '../screens/LeadDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} />
        <Stack.Screen name="EsqueciSenha" component={ForgotPasswordScreen} />
        {/* Tela de dashboard substitui a antiga Home */}
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        {/* Lista de clientes em risco */}
        <Stack.Screen name="Leads" component={LeadsScreen} />
        {/* Detalhes de um cliente específico */}
        <Stack.Screen
          name="LeadDetails"
          component={LeadDetailsScreen}
          options={{ title: 'Detalhes do cliente' }}
        />
        {/* Rotas antigas ainda podem ser usadas se necessário */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="BarcodeScanner"
          component={BarcodeScannerScreen}
          options={{ title: 'Ler código de barras' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}