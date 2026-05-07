import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

export default function PrimaryButton({ title, onPress, fullWidth = true }) {
  return (
    <Pressable style={[styles.button, fullWidth && styles.fullWidth]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.fordBlue,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  fullWidth: { width: '100%' },
  text: { color: colors.white, fontWeight: '700', fontSize: 15, textAlign: 'center' },
});
