import { imageUrl } from '../utils/image';
import { currentUser, users } from './users';

const [marina, lucas, cafe, julia, pedro, ana] = users;

const MY_POST_CAPTIONS = [
  'Primeiro dia de aula 📚',
  'Café e código ☕',
  'Projeto novo saindo do forno 🚀',
  'Fim de semana de descanso 😴',
  'Estudando React Native 📱',
  'Bora pra próxima! 💪',
];

// Publicações do próprio usuário, exibidas na grade do perfil
export const myPosts = MY_POST_CAPTIONS.map((caption, index) => ({
  id: `mine-${index}`,
  user: currentUser,
  image: imageUrl(`meu-post-${index}`, 800),
  likes: 20 + index * 7,
  caption,
  comments: [],
}));

// Publicações fictícias usadas no feed, na busca e no perfil
export const posts = [
  {
    id: 'p1',
    user: marina,
    image: imageUrl('praia', 800),
    likes: 1284,
    caption: 'Fim de tarde perfeito 🌅',
    comments: [
      { id: 'c1', username: 'lucas.fit', text: 'Que lugar incrível!' },
      { id: 'c2', username: 'ana.pets', text: 'Quero ir também 😍' },
    ],
  },
  {
    id: 'p2',
    user: lucas,
    image: imageUrl('treino', 800),
    likes: 532,
    caption: 'Treino feito, bora pra próxima 💪',
    comments: [{ id: 'c3', username: 'pedro.dev', text: 'Monstro!' }],
  },
  {
    id: 'p3',
    user: cafe,
    image: imageUrl('cafe-manha', 800),
    likes: 210,
    caption: 'Cafezinho novo no cardápio ☕',
    comments: [],
  },
  {
    id: 'p4',
    user: julia,
    image: imageUrl('quadro', 800),
    likes: 987,
    caption: 'Meu novo quadro finalizado 🎨',
    comments: [
      { id: 'c4', username: 'marina.viagens', text: 'Ficou lindo!' },
      { id: 'c5', username: 'cafe.da.esquina', text: 'Posso expor aqui?' },
      { id: 'c6', username: 'lucas.fit', text: '👏👏👏' },
    ],
  },
  {
    id: 'p5',
    user: pedro,
    image: imageUrl('setup', 800),
    likes: 341,
    caption: 'Setup novo pra estudar React Native 💻',
    comments: [{ id: 'c7', username: 'julia.arte', text: 'Que organização!' }],
  },
  {
    id: 'p6',
    user: ana,
    image: imageUrl('cachorro', 800),
    likes: 2410,
    caption: 'Ele acordou assim hoje 🐶',
    comments: [{ id: 'c8', username: 'marina.viagens', text: 'Fofo demais!' }],
  },
];
