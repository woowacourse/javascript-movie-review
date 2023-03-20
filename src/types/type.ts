export interface MovieInfo {
  id: number;
  title: string;
  imgUrl: string;
  score: number;
}

export interface ParsedMovieResult {
  isLastPage: boolean;
  movies: MovieInfo[];
}
