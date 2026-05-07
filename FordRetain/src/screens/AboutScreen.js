import { ScrollView, Text, View } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function AboutScreen() {
  return <ScrollView style={globalStyles.screen} contentContainerStyle={globalStyles.container}><Text style={globalStyles.title}>Sobre o projeto</Text><View style={globalStyles.card}><Text>Problema de negócio: reduzir evasão no pós-venda e elevar VIN Share da rede Ford.</Text></View><View style={globalStyles.card}><Text>VIN Share é a participação da rede oficial nos serviços e revisões dos veículos da base ativa.</Text></View><View style={globalStyles.card}><Text>Como ajuda: monitora riscos, prioriza clientes críticos e sugere ações personalizadas de retenção.</Text></View><View style={globalStyles.card}><Text style={{ fontWeight: '700' }}>Arquitetura</Text><Text>Base histórica → Clustering → Perfis → Classificação → API → App Mobile</Text></View><View style={globalStyles.card}><Text style={{ fontWeight: '700' }}>Disciplinas</Text><Text>IA/ML, Mobile, Web Services, Cybersecurity e QA/Testing.</Text></View></ScrollView>;
}
