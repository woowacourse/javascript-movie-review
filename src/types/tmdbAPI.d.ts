interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Genre {
  id: number;
  name: string;
}

interface TmdbResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
  status_code: number;
  poster_path: string;
  title: string;
  genres: Genre[];
  vote_average: number;
  overview: string;
}

interface TmdbUrlParams {
  path: string;
  page?: string;
  query?: string;
}
