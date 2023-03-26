export interface MovieInterface {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  genre_ids: number[];
}

export interface MovieListInterface {
  page: number;
  results: MovieInterface[];
  total_pages: number;
  total_results: number;
}

export type PageStatusType = 'popular' | 'search';
export type ScoreType = undefined | 0 | 2 | 4 | 6 | 8 | 10;
