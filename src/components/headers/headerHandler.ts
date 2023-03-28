import { updateMovies } from "../../domain/movies";
import Store from "../../domain/Store";

const store: Store = Store.getInstance();

export const searchMovieByKeyword = (keyword: string) => {

  if (keyword === "") return;

  store.resetMoviesAndPages();
  store.setLastKeyword(keyword);

  updateMovies(keyword);
}
