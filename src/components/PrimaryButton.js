import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { DISABLED_OPACITY, RADIUS } from '../theme/metrics';

// Botão azul de ação principal, compartilhado por Login e Nova publicação
export default function PrimaryButton({ title, onPress, disabled = false, style }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={[styles.button, disabled && styles.disabled, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: RADIUS.medium,
    padding: 12,
    alignItems: 'center',
  },
  disabled: {
    opacity: DISABLED_OPACITY,
  },
  text: {
    color: colors.background,
    fontWeight: '600',
  },
});
