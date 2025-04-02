import PopularMovieResults from "../domain/PopularMovieResults";

export interface MovieListControllerType {
  mainElement: HTMLElement;
  PopularMovieResults: PopularMovieResults;
}

export interface DetailModalControllerType {
  mainElement: HTMLElement;
  updateStarScore: (id: number, score: number) => void;
}
