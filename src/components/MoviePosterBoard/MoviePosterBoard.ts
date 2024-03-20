import "./style.css";

import createMoviePoster, { MovieInfo } from "../MoviePoster/createMoviePoster";

import createElement from "../../utils/createElement";

class MoviePosterBoard {
  element;
  #ul: HTMLElement;

  constructor(description: string) {
    this.element = this.#createBasicElement(description);
    this.#ul = createElement("ul", { class: "item-list" });
    this.element.append(this.#ul);
  }

  addMoviePoster(movieInfos: MovieInfo[]) {
    const newMoviePosters = movieInfos.map(createMoviePoster);

    this.#ul.append(...newMoviePosters);
  }

  #createBasicElement(description: string) {
    const section = createElement("section", { class: "item-view" });
    const h2 = createElement("h2", {}, description);
    section.append(h2);

    return section;
  }
}

export default MoviePosterBoard;
