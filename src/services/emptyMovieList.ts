import { movieListView } from "../view/movieListView";
import { addButtonView } from "../view/addButtonView";

export function emptyMovieList() {
  movieListView.renderEmptyList();
  addButtonView.hideAddButton();
}
