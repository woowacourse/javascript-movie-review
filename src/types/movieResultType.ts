export interface IMovieResult {
  page: number;
  results: IMovieItem[];
  total_pages: number;
  total_results: number;
}

export interface IMovieItem {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
