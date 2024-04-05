import { ResponseMovieData } from '../api/DB/LocalStorageDBType';

export interface MovieUserServiceType {
  setMovieUserData: ({ movieId, movieData }: { movieId: number; movieData: ResponseMovieData }) => void;
  getMovieUserData: (movieId: number) => ResponseMovieData | null;
}
