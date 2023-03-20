interface GetPopularMoviesRequest {
  page: number;
  region?: string;
  language?: string;
}

interface SearchMoviesRequest {
  query: string;
  page: number;
  language?: string;
  region?: string;
  year?: number;
  primary_release_year?: number;
  include_adult?: boolean;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: 'ko';
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

interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export { Movie, MoviesResponse, GetPopularMoviesRequest, SearchMoviesRequest };
