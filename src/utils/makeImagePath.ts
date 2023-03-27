<<<<<<< HEAD
export function makeImagePath(path: string | null) {
  return path ? `https://image.tmdb.org/t/p/original/${path}` : './image/no_image.jpg';
=======
export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : 'original'}/${id}`;
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
}
