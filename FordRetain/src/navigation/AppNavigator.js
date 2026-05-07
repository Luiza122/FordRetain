import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RiskClientsScreen from '../screens/RiskClientsScreen';
import ClientDetailsScreen from '../screens/ClientDetailsScreen';
import PredictionScreen from '../screens/PredictionScreen';
import ProfilesScreen from '../screens/ProfilesScreen';
import SecurityScreen from '../screens/SecurityScreen';
import AboutScreen from '../screens/AboutScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Dashboard' component={DashboardScreen} options={{ title: 'Dashboard Executivo' }} />
        <Stack.Screen name='RiskClients' component={RiskClientsScreen} options={{ title: 'Clientes em risco' }} />
        <Stack.Screen name='ClientDetails' component={ClientDetailsScreen} options={{ title: 'Detalhes do cliente' }} />
        <Stack.Screen name='Prediction' component={PredictionScreen} options={{ title: 'Predição de cliente' }} />
        <Stack.Screen name='Profiles' component={ProfilesScreen} options={{ title: 'Perfis de comportamento' }} />
        <Stack.Screen name='Security' component={SecurityScreen} options={{ title: 'Segurança e privacidade' }} />
        <Stack.Screen name='About' component={AboutScreen} options={{ title: 'Sobre o projeto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
