import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from './Avatar';
import { colors } from '../theme/colors';
import { AVATAR_SIZE } from '../theme/metrics';

// Bolinha de story: avatar com anel colorido (exceto o story do próprio usuário)
export default function StoryBubble({ story, onPress }) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={`Story de ${story.username}`}
      style={styles.container}
      onPress={onPress}
    >
      <View style={[styles.ring, story.isOwn && styles.ringOwn]}>
        <Avatar uri={story.avatar} size={AVATAR_SIZE.story} />
      </View>
      <Text style={styles.username} numberOfLines={1}>
        {story.username}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 78,
  },
  ring: {
    padding: 3,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.storyRing,
  },
  ringOwn: {
    borderColor: colors.border,
  },
  username: {
    marginTop: 4,
    fontSize: 12,
    color: colors.text,
  },
});
