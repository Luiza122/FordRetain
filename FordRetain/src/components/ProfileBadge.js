import { View, Text, StyleSheet } from 'react-native';

const PROFILE_COLORS = {
  Fiel: '#22C55E',
  'Econômico': '#FACC15',
  Esquecido: '#3B82F6',
  Abandono: '#EF4444',
};

export default function ProfileBadge({ perfil }) {
  return (
    <View style={[styles.badge, { backgroundColor: PROFILE_COLORS[perfil] || '#94A3B8' }]}>
      <Text style={styles.text}>{perfil}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignSelf: 'flex-start',
  },
  text: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },
});
