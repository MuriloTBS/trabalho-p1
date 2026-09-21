import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';
import { colors } from '../theme/colors';
import { AVATAR_SIZE, ICON_SIZE } from '../theme/metrics';

// Cartão de uma publicação: cabeçalho, foto, ações, curtidas e legenda
export default function PostCard({ post, onPressImage, onPressComments }) {
  // O curtir é local e não persiste: o contador soma 1 sobre o valor original
  const [liked, setLiked] = useState(false);
  const likeCount = post.likes + (liked ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={post.user.avatar} size={AVATAR_SIZE.post} />
        <Text style={styles.username}>{post.user.username}</Text>
        <Ionicons name="ellipsis-horizontal" size={ICON_SIZE.menu} color={colors.text} />
      </View>

      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel="Abrir publicação"
        activeOpacity={0.9}
        onPress={onPressImage}
      >
        <Image source={{ uri: post.image }} style={styles.image} />
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Descurtir' : 'Curtir'}
          onPress={() => setLiked((current) => !current)}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={ICON_SIZE.like}
            color={liked ? colors.like : colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Comentar"
          onPress={onPressComments}
        >
          <Ionicons name="chatbubble-outline" size={ICON_SIZE.action} color={colors.text} />
        </TouchableOpacity>
        <Ionicons name="paper-plane-outline" size={ICON_SIZE.action} color={colors.text} />
        <View style={styles.spacer} />
        <Ionicons name="bookmark-outline" size={ICON_SIZE.action} color={colors.text} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.likes}>{likeCount} curtidas</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{post.user.username} </Text>
          {post.caption}
        </Text>
        {post.comments.length > 0 && (
          <TouchableOpacity onPress={onPressComments}>
            <Text style={styles.viewComments}>
              Ver todos os {post.comments.length} comentários
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 10,
  },
  username: {
    flex: 1,
    fontWeight: '600',
    color: colors.text,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colors.border,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  spacer: {
    flex: 1,
  },
  footer: {
    paddingHorizontal: 12,
    gap: 4,
  },
  likes: {
    fontWeight: '600',
    color: colors.text,
  },
  caption: {
    color: colors.text,
  },
  viewComments: {
    color: colors.muted,
  },
});
