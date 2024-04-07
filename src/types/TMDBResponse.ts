export interface TMDBResponse {
  page: number;
  results: MovieInfo[];
  total_pages: number;
  total_results: number;
}

export interface MovieInfo {
  adult: boolean;
  backdrop_path: string;
  genres?: Genres[];
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

export interface Genres {
  id: number;
  name: string;
}
