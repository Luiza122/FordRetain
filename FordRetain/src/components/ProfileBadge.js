import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

const map = {
  'Cliente Fiel': colors.successGreen,
  'Cliente Econômico': colors.warningYellow,
  'Cliente Esquecido': colors.infoBlue,
  'Cliente de Abandono': colors.riskRed,
};

export default function ProfileBadge({ perfil }) {
  return (
    <View style={[styles.badge, { backgroundColor: map[perfil] || colors.fordBlue }]}>
      <Text style={styles.text}>{perfil}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  text: { color: colors.white, fontSize: 12, fontWeight: '700' },
});
