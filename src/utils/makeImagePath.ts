export function makeImagePath(path: string | null) {
  return path ? `https://image.tmdb.org/t/p/original/${path}` : './image/no_image.jpg';
}
