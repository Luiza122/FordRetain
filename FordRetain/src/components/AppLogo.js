import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';

export default function AppLogo({ small = false }) {
  return (
    <View style={[styles.logo, small && styles.logoSmall]}>
      <Text style={[styles.text, small && styles.textSmall]}>Ford</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    minWidth: 190,
    paddingHorizontal: 28,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: colors.white,
    backgroundColor: '#07106B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoSmall: {
    minWidth: 136,
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderWidth: 3,
  },
  text: {
    color: colors.white,
    fontSize: 42,
    fontWeight: '900',
    fontStyle: 'italic',
    letterSpacing: -2,
  },
  textSmall: {
    fontSize: 28,
  },
});
