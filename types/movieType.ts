export interface MovieInfo {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export type movieGenre = {
  id: number;
  name: string;
}

export interface MovieDetailInfo extends MovieInfo {
  release_date: string;
  movieGenres: movieGenre[];
  overview: string;
}

export type FetchMoviesCallback = () => Promise<{ results: MovieInfo[] }>;

