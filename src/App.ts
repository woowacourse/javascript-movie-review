import { Header } from "./components/Header";
import { MovieList } from "./components/MovieList";
import { $ } from "./utils/selector";

export class App {
  #header;
  #movieList;

  constructor() {
    const $header = $("header");
    const $movieList = $(".item-list");

    if ($header) this.#header = new Header($header);
    if ($movieList) this.#movieList = new MovieList($movieList);
  }
}
