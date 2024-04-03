export interface Genres {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface MovieDetail extends Movie {
  genres: Genres[];
}

export interface MovieData {
  movieList: Movie[];
  isEndPage: boolean;
}

export interface PartialMovieDataForItemView extends Partial<MovieData> {
  isEndPage: boolean;
}

export type ListType = "popular" | "search";
