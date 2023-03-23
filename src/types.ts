export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genre_ids: number[];
  overview: string;
}

export interface MovieList {
  movies: Movie[];
  total_pages: number;
}

export interface FailedResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}
