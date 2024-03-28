import "./style.css";

import { MovieInfo } from "../MoviePoster/createMoviePreview";
import MoviePreview from "../MoviePoster/createMoviePreview";
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
