export interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number | null;
  backdrop_path: string | null;
}

export interface PaginatedResponse<T> {
  results: T[];
  total_pages: number;
}

export type MovieResponse = PaginatedResponse<Movie>;

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number | null;
  overview: string;
  genres: Genre[];
  release_date: string;
}
