import { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../components/Avatar';
import { notifications } from '../data/notifications';
import { colors } from '../theme/colors';

// Uma linha de notificação. Sem miniatura = "começou a seguir", então mostra botão Seguir.
function NotificationItem({ item }) {
  const [following, setFollowing] = useState(false);

  return (
    <View style={styles.item}>
      <Avatar uri={item.user.avatar} size={44} />
      <Text style={styles.text}>
        <Text style={styles.username}>{item.user.username} </Text>
        {item.text} <Text style={styles.time}>{item.time}</Text>
      </Text>

      {item.thumb ? (
        <Image source={{ uri: item.thumb }} style={styles.thumb} />
      ) : (
        <TouchableOpacity
          style={[styles.followButton, following && styles.followingButton]}
          onPress={() => setFollowing((current) => !current)}
        >
          <Text style={[styles.followText, following && styles.followingText]}>
            {following ? 'Seguindo' : 'Seguir'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Tela 5: atividade (curtidas, comentários e novos seguidores)
export default function ActivityScreen() {
  return (
    <FlatList
      style={styles.container}
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NotificationItem item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  text: {
    flex: 1,
    color: colors.text,
  },
  username: {
    fontWeight: '600',
  },
  time: {
    color: colors.muted,
  },
  thumb: {
    width: 44,
    height: 44,
    backgroundColor: colors.border,
  },
  followButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },
  followingButton: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  followText: {
    color: '#fff',
    fontWeight: '600',
  },
  followingText: {
    color: colors.text,
  },
});
