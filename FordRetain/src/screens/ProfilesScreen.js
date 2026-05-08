import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ProfileBadge from '../components/ProfileBadge';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';

const profiles=[
{nome:'Cliente Fiel',descricao:'Alta recorrência em revisões e confiança na rede oficial.',comportamento:'Agenda manutenção preventiva e responde bem ao relacionamento.',risco:'Baixo',estrategia:'Programa de fidelidade e benefícios de conveniência.',exemplo:'Rafael Nunes'},
{nome:'Cliente Econômico',descricao:'Decisão guiada por custo-benefício.',comportamento:'Compara preços e adere mais em campanhas promocionais.',risco:'Médio',estrategia:'Pacotes com preço previsível e parcelamento.',exemplo:'Mariana Costa'},
{nome:'Cliente Esquecido',descricao:'Não mantém constância por rotina intensa.',comportamento:'Perde prazos e precisa de estímulo ativo.',risco:'Médio',estrategia:'Lembretes multicanais e agendamento simplificado.',exemplo:'Patrícia Souza'},
{nome:'Cliente em Risco',descricao:'Sinais claros de migração para oficina independente.',comportamento:'Longo período sem revisão e baixa interação.',risco:'Alto',estrategia:'Contato imediato e proposta personalizada.',exemplo:'Carla Menezes'},
];

export default function ProfilesScreen({navigation}){return <ScrollView contentContainerStyle={styles.container}><Text style={styles.title}>Clustering de perfis</Text>{profiles.map((p)=><View key={p.nome} style={styles.card}><ProfileBadge perfil={p.nome}/><Text style={styles.text}>Descrição: {p.descricao}</Text><Text style={styles.text}>Comportamento típico: {p.comportamento}</Text><Text style={styles.text}>Risco: {p.risco}</Text><Text style={styles.text}>Estratégia de retenção: {p.estrategia}</Text><Text style={styles.text}>Exemplo de cliente: {p.exemplo}</Text></View>)}<PrimaryButton title="Voltar" variant="secondary" onPress={()=>navigation.navigate('Dashboard')} /></ScrollView>}
const styles=StyleSheet.create({container:{padding:16,backgroundColor:colors.background,flexGrow:1},title:{fontSize:24,fontWeight:'800',color:colors.navy,marginBottom:10},card:{backgroundColor:colors.white,borderWidth:1,borderColor:colors.border,borderRadius:12,padding:14,marginBottom:10,gap:6},text:{color:'#334155',lineHeight:20}});
