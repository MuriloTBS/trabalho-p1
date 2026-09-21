import { FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { colors } from '../theme/colors';

const COLUMNS = 3;
const GAP = 1;

// Grade de fotos com 3 colunas (usada na busca e no perfil)
export default function PhotoGrid({ photos, onPressPhoto, header }) {
  const { width } = useWindowDimensions();
  // Divide a largura descontando os espaços entre colunas, para a grade ocupar a tela toda
  const size = (width - GAP * (COLUMNS - 1)) / COLUMNS;

  return (
    <FlatList
      data={photos}
      keyExtractor={(photo) => photo.id}
      numColumns={COLUMNS}
      ListHeaderComponent={header}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Foto ${index + 1}`}
          onPress={() => onPressPhoto(item)}
          style={{ marginRight: (index + 1) % COLUMNS === 0 ? 0 : GAP, marginBottom: GAP }}
        >
          <Image source={{ uri: item.uri }} style={[styles.photo, { width: size, height: size }]} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  photo: {
    backgroundColor: colors.border,
  },
});
