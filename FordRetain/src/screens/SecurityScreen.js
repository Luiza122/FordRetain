import { ScrollView, Text, View } from 'react-native';
import globalStyles from '../styles/globalStyles';

const items = [
  'Proteção de dados sensíveis com controle de acesso por perfil.',
  'Dashboard com dados agregados para reduzir exposição individual.',
  'Logs de uso sem exposição de dados pessoais identificáveis.',
  'Auditoria de consultas para rastreabilidade operacional.',
  'Políticas alinhadas à LGPD como requisito de produto.',
  'Separação entre dados de treinamento e dados de produção para segurança analítica.',
];

export default function SecurityScreen() {
  return <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.container}><Text style={globalStyles.title}>Segurança e privacidade</Text>{items.map((item, i)=><View key={i} style={globalStyles.card}><Text>{item}</Text></View>)}</ScrollView>;
}
