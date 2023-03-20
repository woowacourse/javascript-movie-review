export interface Movie {
  id: number;
  title: string;
  imgUrl: string;
  score: number;
}

export interface ParsedMovieResult {
  isLastPage: boolean;
  movies: Movie[];
}
