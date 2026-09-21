import { Alert } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import ActivityScreen from '../ActivityScreen';
import CommentsScreen from '../CommentsScreen';
import FeedScreen from '../FeedScreen';
import LoginScreen from '../LoginScreen';
import NewPostScreen from '../NewPostScreen';
import PostDetailScreen from '../PostDetailScreen';
import ProfileScreen from '../ProfileScreen';
import SearchScreen from '../SearchScreen';
import { notifications } from '../../data/notifications';
import { myPosts, posts } from '../../data/posts';

const makeNavigation = () => ({ navigate: jest.fn(), replace: jest.fn() });

describe('LoginScreen', () => {
  const fillForm = async (username, password) => {
    await fireEvent.changeText(
      screen.getByPlaceholderText('Telefone, nome de usuário ou email'),
      username,
    );
    await fireEvent.changeText(screen.getByPlaceholderText('Senha'), password);
  };

  test('does not enter the app while the form is empty', async () => {
    const navigation = makeNavigation();
    await render(<LoginScreen navigation={navigation} />);

    await fireEvent.press(screen.getByText('Entrar'));

    expect(navigation.replace).not.toHaveBeenCalled();
  });

  test('does not enter with a blank username', async () => {
    const navigation = makeNavigation();
    await render(<LoginScreen navigation={navigation} />);
    await fillForm('   ', 'abc');

    await fireEvent.press(screen.getByText('Entrar'));

    expect(navigation.replace).not.toHaveBeenCalled();
  });

  test('enters the app (replacing login) when both fields are filled', async () => {
    const navigation = makeNavigation();
    await render(<LoginScreen navigation={navigation} />);
    await fillForm('sergio', 'teste');

    await fireEvent.press(screen.getByText('Entrar'));

    expect(navigation.replace).toHaveBeenCalledWith('Main');
  });
});

describe('FeedScreen', () => {
  test('shows the stories strip and every post', async () => {
    await render(<FeedScreen navigation={makeNavigation()} />);

    expect(screen.getByText('Seu story')).toBeTruthy();
    expect(screen.getByText(posts[0].caption, { exact: false })).toBeTruthy();
  });

  test('opens comments and detail with the pressed post', async () => {
    const navigation = makeNavigation();
    await render(<FeedScreen navigation={navigation} />);

    await fireEvent.press(screen.getAllByLabelText('Comentar')[0]);
    await fireEvent.press(screen.getAllByLabelText('Abrir publicação')[0]);

    expect(navigation.navigate).toHaveBeenCalledWith('Comments', { post: posts[0] });
    expect(navigation.navigate).toHaveBeenCalledWith('PostDetail', { post: posts[0] });
  });
});

describe('SearchScreen', () => {
  test('shows the search field and opens a post when a photo is pressed', async () => {
    const navigation = makeNavigation();
    await render(<SearchScreen navigation={navigation} />);

    expect(screen.getByPlaceholderText('Pesquisar')).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Foto 1'));

    expect(navigation.navigate).toHaveBeenCalledWith('PostDetail', { post: posts[0] });
  });
});

describe('NewPostScreen', () => {
  beforeEach(() => {
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
  });
  afterEach(() => jest.restoreAllMocks());

  test('sharing warns the user, clears the caption and goes back to the feed', async () => {
    const navigation = makeNavigation();
    await render(<NewPostScreen navigation={navigation} />);
    const caption = screen.getByPlaceholderText('Escreva uma legenda...');
    await fireEvent.changeText(caption, 'Minha legenda');

    await fireEvent.press(screen.getByText('Compartilhar'));

    expect(Alert.alert).toHaveBeenCalledWith('Publicado!', expect.any(String));
    expect(navigation.navigate).toHaveBeenCalledWith('Feed');
    expect(screen.getByPlaceholderText('Escreva uma legenda...').props.value).toBe('');
  });
});

describe('ActivityScreen', () => {
  test('lists notifications', async () => {
    await render(<ActivityScreen />);

    expect(screen.getAllByText(/curtiu sua foto/)).toHaveLength(
      notifications.filter((item) => item.text.includes('curtiu')).length,
    );
  });

  test('follow button toggles between Seguir and Seguindo', async () => {
    await render(<ActivityScreen />);

    await fireEvent.press(screen.getAllByText('Seguir')[0]);
    expect(screen.getByText('Seguindo')).toBeTruthy();

    await fireEvent.press(screen.getByText('Seguindo'));
    expect(screen.queryByText('Seguindo')).toBeNull();
  });
});

describe('ProfileScreen', () => {
  test('shows the profile stats using the user own posts', async () => {
    await render(<ProfileScreen navigation={makeNavigation()} />);

    expect(screen.getByText(String(myPosts.length))).toBeTruthy();
    expect(screen.getByText('seguidores')).toBeTruthy();
    expect(screen.getAllByLabelText(/^Foto \d+$/)).toHaveLength(myPosts.length);
  });

  test('opens the pressed photo in the detail screen', async () => {
    const navigation = makeNavigation();
    await render(<ProfileScreen navigation={navigation} />);

    await fireEvent.press(screen.getByLabelText('Foto 3'));

    expect(navigation.navigate).toHaveBeenCalledWith('PostDetail', { post: myPosts[2] });
  });

  test('"Sair" goes back to the login', async () => {
    const navigation = makeNavigation();
    await render(<ProfileScreen navigation={navigation} />);

    await fireEvent.press(screen.getByText('Sair'));

    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});

describe('PostDetailScreen', () => {
  test('renders the post received by route params and opens its comments', async () => {
    const navigation = makeNavigation();
    await render(<PostDetailScreen route={{ params: { post: posts[3] } }} navigation={navigation} />);

    expect(screen.getByText(posts[3].caption, { exact: false })).toBeTruthy();
    await fireEvent.press(screen.getByLabelText('Comentar'));

    expect(navigation.navigate).toHaveBeenCalledWith('Comments', { post: posts[3] });
  });
});

describe('CommentsScreen', () => {
  const renderComments = (post) => render(<CommentsScreen route={{ params: { post } }} />);
  const writeComment = async (text) => {
    await fireEvent.changeText(screen.getByPlaceholderText('Adicione um comentário...'), text);
    await fireEvent.press(screen.getByText('Publicar'));
  };

  test('shows existing comments', async () => {
    await renderComments(posts[0]);

    expect(screen.getByText('Que lugar incrível!', { exact: false })).toBeTruthy();
  });

  test('adds a new comment and clears the input', async () => {
    await renderComments(posts[0]);

    await writeComment('  Muito bom  ');

    expect(screen.getByText('Muito bom', { exact: false })).toBeTruthy();
    expect(screen.getByPlaceholderText('Adicione um comentário...').props.value).toBe('');
  });

  test('ignores blank comments and never mutates the original post', async () => {
    await renderComments(posts[2]);

    await writeComment('   ');
    expect(screen.getByText('Nenhum comentário ainda.')).toBeTruthy();

    await writeComment('novo');
    expect(screen.getByText('novo', { exact: false })).toBeTruthy();
    expect(posts[2].comments).toHaveLength(0);
  });

  test('shows a message when there are no comments', async () => {
    await renderComments(posts[2]);

    expect(screen.getByText('Nenhum comentário ainda.')).toBeTruthy();
  });
});
