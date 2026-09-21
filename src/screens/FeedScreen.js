import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../components/PostCard';
import StoryBubble from '../components/StoryBubble';
import { posts } from '../data/posts';
import { stories } from '../data/stories';
import { colors } from '../theme/colors';

// Tela 2: feed com stories no topo e lista de publicações
export default function FeedScreen({ navigation }) {
  // Faixa horizontal de stories (cabeçalho da lista de posts)
  const renderStories = () => (
    <FlatList
      horizontal
      data={stories}
      keyExtractor={(story) => story.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.stories}
      renderItem={({ item }) => <StoryBubble story={item} />}
    />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="heart-outline" size={26} color={colors.text} />
          <Ionicons name="paper-plane-outline" size={26} color={colors.text} />
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        ListHeaderComponent={renderStories}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onPressImage={() => navigation.navigate('PostDetail', { post: item })}
            onPressComments={() => navigation.navigate('Comments', { post: item })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  logo: {
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: '600',
    color: colors.text,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  stories: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
});
