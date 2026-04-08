import { movieListView } from "../view/movieListView";
import { addButtonView } from "../view/addButtonView";

export function errorMovieList(errorMessage: string) {
  console.log("에러 원인:", errorMessage);
  movieListView.renderErrorList();
  addButtonView.hideAddButton();
}
