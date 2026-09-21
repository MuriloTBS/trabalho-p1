// Gera uma imagem aleatória (sempre a mesma para o mesmo "seed") usando o picsum.photos
export const imageUrl = (seed, size = 600) =>
  `https://picsum.photos/seed/${seed}/${size}/${size}`;
