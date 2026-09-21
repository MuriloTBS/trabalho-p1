import { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../theme/colors';

// Espaço do cabeçalho da stack, para o teclado não cobrir o campo de comentário no iOS
const KEYBOARD_OFFSET = 90;

// Tela 8: comentários de uma publicação, com campo para comentar
export default function CommentsScreen({ route }) {
  const { post } = route.params;
  const [comments, setComments] = useState(post.comments);
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() === '') return;
    const newComment = { id: `c-${Date.now()}`, username: 'sergio.nogueira', text: text.trim() };
    // Cria uma nova lista em vez de alterar a existente
    setComments((current) => [...current, newComment]);
    setText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={KEYBOARD_OFFSET}
    >
      <FlatList
        data={comments}
        keyExtractor={(comment) => comment.id}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum comentário ainda.</Text>}
        renderItem={({ item }) => (
          <Text style={styles.comment}>
            <Text style={styles.username}>{item.username} </Text>
            {item.text}
          </Text>
        )}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Adicione um comentário..."
          placeholderTextColor={colors.muted}
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSend}>
          <Text style={styles.send}>Publicar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  comment: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.text,
  },
  username: {
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: 24,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
  },
  send: {
    color: colors.primary,
    fontWeight: '600',
  },
});
