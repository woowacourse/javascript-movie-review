import { MovieList } from "./components/MovieList";
import { $ } from "./utils/selector";

export class App {
  #movieList;

  constructor() {
    const movieList = $(".item-list");

    if (movieList) this.#movieList = new MovieList(movieList);
  }
}
