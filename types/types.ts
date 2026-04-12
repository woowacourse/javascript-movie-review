interface BaseMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number | null;
}

export interface Movie extends BaseMovie {
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

export interface MovieDetail extends BaseMovie {
  overview: string;
  genres: Genre[];
  release_date: string;
}
