import { IMovieGenre } from '../api/api';

export function makeGenreList(genres: IMovieGenre[]): string {
  const genreList = genres.map((genre) => genre.name);
  return genreList.join();
}
