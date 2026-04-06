
export type TMDBAPIEndpoint = "/movie/popular" | "/search/movie"

export interface Movie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  poster_path: string;
  backdrop_path: string;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
