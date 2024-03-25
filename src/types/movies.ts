export interface FetchResponse<T> {
  results: T;
}

export interface MovieItemResponse {
  id: number;
  title: string;
  original_title: string;
  original_language: string;
  backdrop_path: string;
  poster_path: string;
  genre_ids: number[];
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date: string;
  video: boolean;
  adult: boolean;
}

export interface MovieItem {
  id: number;
  title: string;
  imagePath: string;
  voteAverage: number;
}
