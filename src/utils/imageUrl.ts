const imageUrl = (path: string, size: number = 400) =>
  `https://image.tmdb.org/t/p/w${size}${path}`;

export default imageUrl;
