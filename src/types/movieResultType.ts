export interface MovieResultType {
  page: number;
  results: MovieItemType[];
  total_pages: number;
  total_results: number;
}

export interface MovieItemType {
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

export interface storedMovieItemType {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  vote_average: number;
  starScore: number;
}
