import { StyleSheet } from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primaryLight,
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  spacingXs: { marginBottom: 4 },
  spacingSm: { marginBottom: 8 },
  spacingMd: { marginBottom: 16 },
  spacingLg: { marginBottom: 24 },
});

export default globalStyles;
