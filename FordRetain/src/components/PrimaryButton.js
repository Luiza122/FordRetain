import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

export default function PrimaryButton({ title, onPress, variant = 'primary' }) {
  const isSecondary = variant === 'secondary';

  return (
    <Pressable style={[styles.button, isSecondary ? styles.secondaryButton : styles.primaryButton]} onPress={onPress}>
      <Text style={[styles.text, isSecondary ? styles.secondaryText : styles.primaryText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
    borderWidth: 1,
  },
  primaryButton: {
    backgroundColor: colors.fordBlue,
    borderColor: colors.fordBlue,
  },
  secondaryButton: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.fordBlue,
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.fordBlue,
  },
});
