import { imageUrl } from '../utils/image';
import { users } from './users';

const [marina, lucas, cafe, julia, pedro] = users;

// Notificações fictícias da aba de atividade.
// `thumb` é a miniatura do post curtido; quando ausente, mostra botão "Seguir".
export const notifications = [
  { id: 'n1', user: marina, text: 'curtiu sua foto.', time: '2 min', thumb: imageUrl('n1', 100) },
  { id: 'n2', user: lucas, text: 'começou a seguir você.', time: '1 h' },
  { id: 'n3', user: cafe, text: 'comentou: "Adorei!"', time: '3 h', thumb: imageUrl('n3', 100) },
  { id: 'n4', user: julia, text: 'curtiu sua foto.', time: '5 h', thumb: imageUrl('n4', 100) },
  { id: 'n5', user: pedro, text: 'começou a seguir você.', time: '1 d' },
];
