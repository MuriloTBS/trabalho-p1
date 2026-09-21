import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import Avatar from '../Avatar';
import PhotoGrid from '../PhotoGrid';
import PostCard from '../PostCard';
import StoryBubble from '../StoryBubble';
import { posts } from '../../data/posts';

describe('Avatar', () => {
  test('renders a round image with the given size', async () => {
    await render(<Avatar uri="https://x/y.png" size={50} />);

    const image = screen.getByLabelText('Foto de perfil');
    expect(image.props.source).toEqual({ uri: 'https://x/y.png' });
    expect(image.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ width: 50, height: 50, borderRadius: 25 })]),
    );
  });
});

describe('StoryBubble', () => {
  const story = { id: 's1', username: 'lucas.fit', avatar: 'https://x/a.png', isOwn: false };

  test('shows the username and reacts to press', async () => {
    const onPress = jest.fn();
    await render(<StoryBubble story={story} onPress={onPress} />);

    await fireEvent.press(screen.getByRole('button', { name: 'Story de lucas.fit' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

describe('PostCard', () => {
  const post = posts[0];

  test('shows author, caption and likes', async () => {
    await render(<PostCard post={post} />);

    expect(screen.getByText(`${post.likes} curtidas`)).toBeTruthy();
    expect(screen.getByText(post.caption, { exact: false })).toBeTruthy();
  });

  test('toggles like: adds one and removes it on second press', async () => {
    await render(<PostCard post={post} />);
    await fireEvent.press(screen.getByLabelText('Curtir'));
    expect(screen.getByText(`${post.likes + 1} curtidas`)).toBeTruthy();

    await fireEvent.press(screen.getByLabelText('Descurtir'));
    expect(screen.getByText(`${post.likes} curtidas`)).toBeTruthy();
    expect(screen.queryByLabelText('Descurtir')).toBeNull();
  });

  test('opens comments from the comments link', async () => {
    const onPressComments = jest.fn();
    await render(<PostCard post={post} onPressComments={onPressComments} />);

    await fireEvent.press(screen.getByText(`Ver todos os ${post.comments.length} comentários`));

    expect(onPressComments).toHaveBeenCalledTimes(1);
  });

  test('hides the comments link when there are no comments', async () => {
    await render(<PostCard post={{ ...post, comments: [] }} />);

    expect(screen.queryByText(/Ver todos os/)).toBeNull();
  });

  test('opens the detail when the image is pressed', async () => {
    const onPressImage = jest.fn();
    await render(<PostCard post={post} onPressImage={onPressImage} />);

    await fireEvent.press(screen.getByLabelText('Abrir publicação'));

    expect(onPressImage).toHaveBeenCalledTimes(1);
  });
});

describe('PhotoGrid', () => {
  const photos = [
    { id: 'a', uri: 'https://x/a.png' },
    { id: 'b', uri: 'https://x/b.png' },
    { id: 'c', uri: 'https://x/c.png' },
    { id: 'd', uri: 'https://x/d.png' },
  ];

  test('calls onPressPhoto with the pressed photo', async () => {
    const onPressPhoto = jest.fn();
    await render(<PhotoGrid photos={photos} onPressPhoto={onPressPhoto} />);

    await fireEvent.press(screen.getByLabelText('Foto 2'));

    expect(onPressPhoto).toHaveBeenCalledWith(photos[1]);
  });

  test('renders the optional header', async () => {
    await render(<PhotoGrid photos={photos} onPressPhoto={jest.fn()} header={<Text>Cabeçalho</Text>} />);

    expect(screen.getByText('Cabeçalho')).toBeTruthy();
  });
});
