export interface Movie {
  title: string;
  poster_path: string;
  vote_average: number;
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
