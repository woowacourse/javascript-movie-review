export interface Movie {
  popularity?: number;
  poster_path: string;
  title: string;
  adult?: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language?: string;
  original_title?: string;
  overview: string;
  vote_average: number;
  vote_count?: number;
  video?: boolean;
  release_date?: string;
  genres: string[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Score {
  movieId: string;
  score: string;
}

export interface CustomEvent {
  eventType: string;
  data?: string | Score | null;
}

export interface ResponseData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
