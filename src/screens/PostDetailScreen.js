import { ScrollView, StyleSheet } from 'react-native';
import PostCard from '../components/PostCard';
import { colors } from '../theme/colors';

// Tela 7: detalhe de uma publicação (recebe o `post` pela navegação)
export default function PostDetailScreen({ route, navigation }) {
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      <PostCard
        post={post}
        onPressComments={() => navigation.navigate('Comments', { post })}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
