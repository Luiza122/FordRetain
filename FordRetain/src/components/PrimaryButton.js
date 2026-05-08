import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

export default function PrimaryButton({ title, onPress, variant = 'primary' }) {
  const secondary = variant === 'secondary';
  return (
    <Pressable style={({ pressed }) => [styles.button, secondary ? styles.secondary : styles.primary, pressed && styles.pressed]} onPress={onPress}>
      <Text style={[styles.text, secondary ? styles.secondaryText : styles.primaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { paddingVertical: 13, paddingHorizontal: 14, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginVertical: 5, borderWidth: 1 },
  primary: { backgroundColor: colors.fordBlue, borderColor: colors.fordBlue, shadowColor: '#1E5AA8', shadowOpacity: 0.25, shadowRadius: 8, elevation: 3 },
  secondary: { backgroundColor: colors.white, borderColor: colors.fordBlue },
  pressed: { opacity: 0.85 },
  text: { fontWeight: '700', fontSize: 15 },
  primaryText: { color: colors.white },
  secondaryText: { color: colors.fordBlue },
});
