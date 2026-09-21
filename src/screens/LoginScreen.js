import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { RADIUS } from '../theme/metrics';

// Tela 1: login. É um mock: qualquer usuário/senha preenchidos entram, sem validar credenciais.
export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const canSubmit = username.trim() !== '' && password !== '';

  // `replace` (e não `navigate`) evita que o botão "voltar" leve de volta ao login
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

      <PrimaryButton
        title="Entrar"
        disabled={!canSubmit}
        onPress={handleLogin}
        style={styles.button}
      />
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
    borderRadius: RADIUS.small,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    marginTop: 6,
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
