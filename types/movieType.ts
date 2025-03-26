export interface MovieInfo {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

export type FetchMoviesCallback = () => Promise<{ results: MovieInfo[] }>;
