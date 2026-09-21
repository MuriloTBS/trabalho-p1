import { StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PhotoGrid from '../components/PhotoGrid';
import { posts } from '../data/posts';
import { colors } from '../theme/colors';
import { ICON_SIZE } from '../theme/metrics';
import { imageUrl } from '../utils/image';

const EXPLORE_COUNT = 24;

// Fotos da grade de explorar; cada uma aponta para um post fictício ao ser tocada
const explorePhotos = Array.from({ length: EXPLORE_COUNT }, (_, index) => ({
  id: `explore-${index}`,
  uri: imageUrl(`explore-${index}`, 300),
  post: posts[index % posts.length],
}));

// Tela 3: busca com grade de fotos para explorar
export default function SearchScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={ICON_SIZE.small} color={colors.muted} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          placeholderTextColor={colors.muted}
        />
      </View>

      <PhotoGrid
        photos={explorePhotos}
        onPressPhoto={(photo) => navigation.navigate('PostDetail', { post: photo.post })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    margin: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
  },
});
