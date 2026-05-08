import { Pressable, Text, View, StyleSheet } from 'react-native';
import ProfileBadge from './ProfileBadge';
import colors from '../styles/colors';

const riskColor = (value) => (value >= 75 ? '#DC2626' : value >= 50 ? '#F59E0B' : '#16A34A');

export default function ClientCard({ cliente, onPress }) {
  return (
    <Pressable style={styles.card} onPress={() => onPress(cliente)}>
      <View style={styles.row}><Text style={styles.nome}>{cliente.nome}</Text><Text style={[styles.risco,{color:riskColor(cliente.riscoEvasao)}]}>{cliente.riscoEvasao}%</Text></View>
      <Text style={styles.meta}>{cliente.veiculo} • {cliente.ano} • Garantia {cliente.garantiaStatus}</Text>
      <ProfileBadge perfil={cliente.perfil} />
      <Text style={styles.meta}>Região: {cliente.regiao}</Text>
      <Text style={styles.action}>Ver detalhes e plano de retenção</Text>
    </Pressable>
  );
}
const styles=StyleSheet.create({card:{backgroundColor:colors.white,borderRadius:12,padding:14,borderWidth:1,borderColor:colors.border,gap:8},row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},nome:{fontSize:16,fontWeight:'700',color:colors.navy,flex:1},risco:{fontSize:17,fontWeight:'800'},meta:{fontSize:13,color:'#475569'},action:{fontSize:12,fontWeight:'700',color:colors.fordBlue}});
