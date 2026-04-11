export interface Movie {
  id: number;
  poster_path: string | null;
  title: string;
  vote_average: number | null;
  backdrop_path: string | null;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

export interface MovieDetail {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number | null;
  overview: string;
  genres: { id: number; name: string }[];
  release_date: string;
}
