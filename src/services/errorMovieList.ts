import { movieListView } from "../view/movieListView";

export function errorMovieList(errorMessage: string) {
  console.log("에러 원인:", errorMessage);
  movieListView.renderErrorList();
}
