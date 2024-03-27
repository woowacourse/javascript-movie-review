export interface Movie {
  id: number;
  overview: string;
  poster_path: string | null;
  title: string;
  vote_average: number;
}

export interface MovieData {
  movieList: Movie[];
  isMoreData: boolean;
}

export interface PartialMovieDataForItemView extends Partial<MovieData> {
  isMoreData: boolean;
}

export type ListType = 'popular' | 'search';

export interface LocalStorageUserScore {
  id: number;
  score: number;
}
