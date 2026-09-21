import { currentUser, users } from './users';

// Primeiro story é o do próprio usuário (sem anel colorido), depois os dos amigos
export const stories = [
  { id: 's-me', username: 'Seu story', avatar: currentUser.avatar, isOwn: true },
  ...users.map((user) => ({
    id: `s-${user.id}`,
    username: user.username,
    avatar: user.avatar,
    isOwn: false,
  })),
];
