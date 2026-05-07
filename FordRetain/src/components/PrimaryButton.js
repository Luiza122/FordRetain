import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

export default function PrimaryButton({ title, onPress }) {
  return (
    <Pressable style={({ pressed }) => [styles.button, pressed && styles.pressed]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    minHeight: 52,
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#154680',
  },
  pressed: { opacity: 0.85 },
  text: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
