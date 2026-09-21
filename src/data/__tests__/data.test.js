import { imageUrl } from '../../utils/image';
import { notifications } from '../notifications';
import { myPosts, posts } from '../posts';
import { stories } from '../stories';
import { currentUser, users } from '../users';

describe('imageUrl', () => {
  test('builds a deterministic picsum url from the seed and size', () => {
    expect(imageUrl('praia', 300)).toBe('https://picsum.photos/seed/praia/300/300');
  });

  test('uses 600px when no size is given', () => {
    expect(imageUrl('praia')).toBe('https://picsum.photos/seed/praia/600/600');
  });
});

describe('stories', () => {
  test('starts with the own story, followed by one story per user', () => {
    expect(stories[0]).toMatchObject({ isOwn: true, username: 'Seu story' });
    expect(stories).toHaveLength(users.length + 1);
  });

  test('only the first story is marked as own', () => {
    expect(stories.filter((story) => story.isOwn)).toHaveLength(1);
  });
});

describe('posts', () => {
  test('every post has a unique id and an author', () => {
    const ids = posts.map((post) => post.id);

    expect(new Set(ids).size).toBe(ids.length);
    posts.forEach((post) => expect(post.user.username).toBeTruthy());
  });

  test('myPosts belong to the current user', () => {
    expect(myPosts).toHaveLength(6);
    myPosts.forEach((post) => expect(post.user).toBe(currentUser));
  });

  test('ids of myPosts do not collide with feed posts', () => {
    const feedIds = new Set(posts.map((post) => post.id));

    myPosts.forEach((post) => expect(feedIds.has(post.id)).toBe(false));
  });
});

describe('notifications', () => {
  test('follow notifications have no thumbnail and like/comment ones do', () => {
    notifications.forEach((item) => {
      const isFollow = item.text.includes('seguir');

      expect(Boolean(item.thumb)).toBe(!isFollow);
    });
  });
});
