import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RiskClientsScreen from '../screens/RiskClientsScreen';
import ClientDetailsScreen from '../screens/ClientDetailsScreen';
import RecommendationScreen from '../screens/RecommendationsScreen';
import PredictionScreen from '../screens/PredictionScreen';
import ProfilesScreen from '../screens/ProfilesScreen';
import RegisterScreen from '../screens/RegisterScreen';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: colors.navy },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={RegisterScreen} options={{ title: 'Criar conta' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tela inicial' }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Dashboard' }} />
        <Stack.Screen name="Clients" component={RiskClientsScreen} options={{ title: 'Clientes' }} />
        <Stack.Screen name="ClientDetails" component={ClientDetailsScreen} options={{ title: 'Detalhes do cliente' }} />
        <Stack.Screen name="Recommendations" component={RecommendationScreen} options={{ title: 'Recomendações' }} />
        <Stack.Screen name="Prediction" component={PredictionScreen} options={{ title: 'Classificação' }} />
        <Stack.Screen name="Profiles" component={ProfilesScreen} options={{ title: 'Clustering' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
