import { ScrollView, StyleSheet, Text, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import colors from '../styles/colors';

function InfoCard({ title, children }) { return <View style={styles.card}><Text style={styles.cardTitle}>{title}</Text><Text style={styles.cardText}>{children}</Text></View>; }

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>FordRetain</Text>
      <Text style={styles.subtitle}>Retenção preditiva para elevar o VIN Share das concessionárias Ford.</Text>
      <InfoCard title="O que é VIN Share?">É o percentual de serviços de manutenção de veículos Ford realizados na rede oficial. Quando cai, a concessionária perde receita e relacionamento.</InfoCard>
      <InfoCard title="Por que os clientes evadem após a garantia?">Com o fim da garantia, aumentam comparações de preço, esquecimento de revisão e migração para oficinas independentes.</InfoCard>
      <InfoCard title="Como o FordRetain atua?">Clustering separa perfis comportamentais, classificação estima risco de evasão e recomendações acionam campanhas para recuperar clientes.</InfoCard>
      <View style={styles.actions}>
        <PrimaryButton title="Dashboard" onPress={() => navigation.navigate('Dashboard')} />
        <PrimaryButton title="Clientes" onPress={() => navigation.navigate('Clients')} />
        <PrimaryButton title="Classificação" onPress={() => navigation.navigate('Prediction')} />
        <PrimaryButton title="Clustering" onPress={() => navigation.navigate('Profiles')} />
        <PrimaryButton title="Recomendações" onPress={() => navigation.navigate('Recommendations')} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({ container:{flexGrow:1,padding:16,backgroundColor:colors.background},title:{fontSize:31,fontWeight:'800',color:colors.navy},subtitle:{color:colors.textGray,marginTop:6,marginBottom:12,lineHeight:20},card:{backgroundColor:colors.white,borderWidth:1,borderColor:colors.border,borderRadius:14,padding:14,marginBottom:10},cardTitle:{fontWeight:'700',color:colors.navy,marginBottom:6},cardText:{color:'#334155',lineHeight:20},actions:{marginTop:6}});
