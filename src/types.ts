export interface MovieResponse {
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

export interface Movie {
  title: string;
  posterPath: string;
  voteAverage: number;
}

export interface MovieList {
  movies: Movie[];
  totalPages: number;
}

export interface FailedResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}
