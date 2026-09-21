import { useState } from 'react';
import { Alert, Image, StyleSheet, TextInput, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { imageUrl } from '../utils/image';

// Tela 4: nova publicação (foto fixa + legenda). Compartilhar só exibe um aviso.
export default function NewPostScreen({ navigation }) {
  const [caption, setCaption] = useState('');

  const handleShare = () => {
    Alert.alert('Publicado!', 'Sua foto foi compartilhada (simulação).');
    setCaption('');
    navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={{ uri: imageUrl('nova-foto', 200) }} style={styles.preview} />
        <TextInput
          style={styles.caption}
          placeholder="Escreva uma legenda..."
          placeholderTextColor={colors.muted}
          multiline
          value={caption}
          onChangeText={setCaption}
        />
      </View>

      <PrimaryButton title="Compartilhar" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  preview: {
    width: 90,
    height: 90,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  caption: {
    flex: 1,
    textAlignVertical: 'top',
  },
});
