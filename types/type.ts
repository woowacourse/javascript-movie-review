export type HTMLTagName = keyof HTMLElementTagNameMap;

export interface MovieData {
  adult: boolean;
  backdrop_path: null | string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieListData {
  page: number;
  results: MovieData[];
  total_pages: number;
  total_results: number;
}

export interface MovieListSectionProps {
  title: string;
  movieResult: MovieListData;
}
