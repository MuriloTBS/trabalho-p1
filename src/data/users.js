import { imageUrl } from '../utils/image';

// Usuários fictícios que aparecem no feed, stories e notificações
export const users = [
  { id: 'u1', username: 'marina.viagens', avatar: imageUrl('marina', 150) },
  { id: 'u2', username: 'lucas.fit', avatar: imageUrl('lucas', 150) },
  { id: 'u3', username: 'cafe.da.esquina', avatar: imageUrl('cafe', 150) },
  { id: 'u4', username: 'julia.arte', avatar: imageUrl('julia', 150) },
  { id: 'u5', username: 'pedro.dev', avatar: imageUrl('pedro', 150) },
  { id: 'u6', username: 'ana.pets', avatar: imageUrl('ana', 150) },
];

// Usuário "logado" (dono do perfil)
export const currentUser = {
  id: 'me',
  username: 'sergio.nogueira',
  name: 'Sérgio Nogueira',
  avatar: imageUrl('sergio', 150),
  bio: 'Estudante de ADS 📚\nReact Native • Expo',
  followers: 342,
  following: 198,
};
