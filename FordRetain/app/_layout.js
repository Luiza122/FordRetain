import { Stack } from 'expo-router';
import colors from '../src/styles/colors';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.navy },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="cadastro" options={{ title: 'Criar conta' }} />
      <Stack.Screen name="home" options={{ title: 'Tela inicial' }} />
      <Stack.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="clients" options={{ title: 'Clientes' }} />
      <Stack.Screen name="client-details" options={{ title: 'Detalhes do cliente' }} />
      <Stack.Screen name="recommendations" options={{ title: 'Recomendações' }} />
      <Stack.Screen name="prediction" options={{ title: 'Classificação' }} />
      <Stack.Screen name="profiles" options={{ title: 'Clustering' }} />
    </Stack>
  );
}
