import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

// Tela 1: login. Qualquer usuário/senha preenchidos entram no app (é só um mock).
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = username.trim() !== '' && password !== '';

  // `replace` troca a tela de login pelo app, então o botão "voltar" não retorna ao login
  const handleLogin = () => navigation.replace('Main');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>Instagram</Text>

      <TextInput
        style={styles.input}
        placeholder="Telefone, nome de usuário ou email"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.muted}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, !canSubmit && styles.buttonDisabled]}
        disabled={!canSubmit}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.forgot}>Esqueceu a senha?</Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Não tem uma conta? <Text style={styles.link}>Cadastre-se</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    fontSize: 44,
    fontStyle: 'italic',
    fontWeight: '600',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 32,
  },
  input: {
    backgroundColor: colors.inputBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  forgot: {
    textAlign: 'center',
    color: colors.primary,
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: colors.muted,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
});
