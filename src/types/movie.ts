export interface MovieType {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  genre_ids: number[];
  overview: string;
}

export type MovieListType = MovieType[];
