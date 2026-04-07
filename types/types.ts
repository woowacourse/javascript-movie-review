export interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number;
  backdrop_path: string | null;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
}
