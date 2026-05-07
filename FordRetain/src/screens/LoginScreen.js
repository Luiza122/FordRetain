import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';
import globalStyles from '../styles/globalStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('gerente@fordretain.com');
  const [senha, setSenha] = useState('123456');

  const handleLogin = () => {
    if (email === 'gerente@fordretain.com' && senha === '123456') return navigation.replace('Dashboard');
    Alert.alert('Acesso negado', 'Use o login de teste informado.');
  };

  return <View style={[globalStyles.screen, styles.center]}><View style={styles.card}><Text style={styles.logo}>FordRetain</Text><Text style={globalStyles.subtitle}>Plataforma de retenção preditiva para veículos Ford</Text><TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder='E-mail' autoCapitalize='none'/><TextInput style={styles.input} value={senha} onChangeText={setSenha} placeholder='Senha' secureTextEntry/><PrimaryButton title='Entrar' onPress={handleLogin}/></View></View>;
}
const styles = StyleSheet.create({ center:{flex:1,justifyContent:'center',padding:16}, card:{backgroundColor:colors.white,padding:18,borderRadius:14,borderWidth:1,borderColor:colors.border}, logo:{fontSize:30,fontWeight:'800',color:colors.navy,marginBottom:6}, input:{borderWidth:1,borderColor:colors.border,borderRadius:10,padding:12,marginVertical:8,backgroundColor:colors.lightBlue}});
