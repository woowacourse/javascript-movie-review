export interface Movie {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  genre_ids: Array<number>;
  vote_average: number;
}

export interface Genre {
  id: number;
  name: string;
}
