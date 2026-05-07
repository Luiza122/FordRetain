import { Pressable, StyleSheet, Text } from 'react-native';
import colors from '../styles/colors';

export default function PrimaryButton({ title, onPress }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.fordBlue,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
});
