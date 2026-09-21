import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../../../App';

// Fluxo completo pelo App: Login -> abas -> comentários
describe('App navigation', () => {
  const login = async () => {
    await fireEvent.changeText(
      screen.getByPlaceholderText('Telefone, nome de usuário ou email'),
      'sergio',
    );
    await fireEvent.changeText(screen.getByPlaceholderText('Senha'), 'teste');
    await fireEvent.press(screen.getByText('Entrar'));
  };

  test('starts on the login screen', async () => {
    await render(<App />);

    expect(await screen.findByText('Cadastre-se')).toBeTruthy();
  });

  test('logs in and lands on the feed with the tab bar', async () => {
    await render(<App />);

    await login();

    expect(await screen.findByText('Seu story')).toBeTruthy();
  });

  test('opens the comments screen from the feed', async () => {
    await render(<App />);
    await login();

    await fireEvent.press((await screen.findAllByLabelText('Comentar'))[0]);

    expect(await screen.findByPlaceholderText('Adicione um comentário...')).toBeTruthy();
  });
});
