export interface MovieInfo {
  id: number;
  title: string;
  imgUrl: string;
  score: number;
  description: string;
}

export interface MovieDetailInfo extends MovieInfo {
  categories: string;
  releaseDate: string;
  runningTime: number;
}

export interface ParsedMovieResult {
  isLastPage: boolean;
  movies: MovieInfo[];
}

export interface MovieScoreInfo {
  id: number;
  score: number;
}
