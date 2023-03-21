type OriginalLanguage = "es" | "fr" | "en" | "no";

export interface IMovie {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: OriginalLanguage;
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

export interface IMoviesResponseData {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
