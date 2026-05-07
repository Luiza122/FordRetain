import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

export default function PrimaryButton({ title, onPress, variant = 'primary' }) {
  const isSecondary = variant === 'secondary';

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isSecondary ? styles.secondaryButton : styles.primaryButton,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
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
    shadowColor: '#0B1F3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
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
    letterSpacing: 0.2,
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.fordBlue,
  },
});
