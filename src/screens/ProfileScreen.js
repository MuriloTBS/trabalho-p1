import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../components/Avatar';
import PhotoGrid from '../components/PhotoGrid';
import { currentUser } from '../data/users';
import { myPosts } from '../data/posts';
import { colors } from '../theme/colors';
import { AVATAR_SIZE, RADIUS } from '../theme/metrics';

const profilePhotos = myPosts.map((post) => ({ id: post.id, uri: post.image, post }));

// Número + rótulo (ex.: "6 publicações")
function Stat({ value, label }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// Tela 6: perfil do usuário com estatísticas, bio e grade de fotos
export default function ProfileScreen({ navigation }) {
  const header = (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <Avatar uri={currentUser.avatar} size={AVATAR_SIZE.profile} />
        <View style={styles.stats}>
          <Stat value={myPosts.length} label="publicações" />
          <Stat value={currentUser.followers} label="seguidores" />
          <Stat value={currentUser.following} label="seguindo" />
        </View>
      </View>

      <Text style={styles.name}>{currentUser.name}</Text>
      <Text style={styles.bio}>{currentUser.bio}</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Editar perfil</Text>
        </TouchableOpacity>
        {/* Volta para o login, simulando "sair da conta" */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <PhotoGrid
        photos={profilePhotos}
        header={header}
        onPressPhoto={(photo) => navigation.navigate('PostDetail', { post: photo.post })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    gap: 6,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginBottom: 8,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  statLabel: {
    color: colors.text,
  },
  name: {
    fontWeight: '600',
    color: colors.text,
  },
  bio: {
    color: colors.text,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: RADIUS.medium,
    paddingVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    color: colors.text,
  },
});
