import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Compartilhar</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
