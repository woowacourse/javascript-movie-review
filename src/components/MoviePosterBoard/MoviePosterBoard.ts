import "./style.css";

import { MovieInfo } from "../MoviePreview/createMoviePreview";
import MoviePreview from "../MoviePreview/createMoviePreview";
import createElement from "../../utils/createElement";

class MoviePosterBoard {
  element = createElement("ul", { attrs: { class: "item-list" } });

  addMoviePosters(
    movieInfos: MovieInfo[],
    itemClickAction?: (id: string) => void
  ) {
    const newMoviePosters = movieInfos.map((movieInfo) => {
      const preview = new MoviePreview(movieInfo).element;
      if (itemClickAction)
        preview.addEventListener("click", () => itemClickAction(movieInfo.id));
      return preview;
    });

    this.element.append(...newMoviePosters);
  }
  deleteMoviePosters() {
    this.element.replaceChildren();
  }
}

export default MoviePosterBoard;
