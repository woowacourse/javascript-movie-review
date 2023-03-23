export interface MovieInfo {
  id: number;
  title: string;
  imgUrl: string;
  score: number;
  description: string;
}

export interface ParsedMovieResult {
  isLastPage: boolean;
  movies: MovieInfo[];
}
