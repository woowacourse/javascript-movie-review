export interface Movie {
  poster: string;
  title: string;
  ratings: number;
  id: number;
}

export interface MovieApiResponse {
  poster_path: string;
  title: string;
  vote_average: number;
  id: number;
}

export interface ApiData {
  success: boolean;
  status_message: string | undefined;
  total_pages: number;
  results: MovieApiResponse[];
}
