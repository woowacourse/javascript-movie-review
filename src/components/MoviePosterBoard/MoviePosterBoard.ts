import "./style.css";

import { MovieInfo } from "../MoviePreview/createMoviePreview";
import MoviePreview from "../MoviePreview/createMoviePreview";
import createElement from "../../utils/createElement";

class MoviePosterBoard {
  element = createElement("ul", { attrs: { class: "item-list" } });

  addMoviePosters(movieInfos: MovieInfo[]) {
    const newMoviePosters = movieInfos.map(
      (movieInfo) => new MoviePreview(movieInfo).element
    );

    this.element.append(...newMoviePosters);
  }
  deleteMoviePosters() {
    this.element.replaceChildren();
  }
}

export default MoviePosterBoard;
