import { Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

// Foto de perfil redonda. `size` controla o tamanho em pixels.
export default function Avatar({ uri, size = 40, label = 'Foto de perfil' }) {
  return (
    <Image
      accessibilityLabel={label}
      source={{ uri }}
      style={[
        styles.avatar,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.border,
  },
});
