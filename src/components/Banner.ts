import { Movie } from "../../types/domain";
import { IMAGE } from "../constants/movie";
import { selectElement } from "../utils/ui";

class Banner {
  #topMovie;

  constructor(topMovie: Movie) {
    this.#topMovie = topMovie;
  }

  renderTitleMovie() {
    const { title, voteAverage, backdropPath } = this.#topMovie;
    const movieBackdropUrl = IMAGE.backdropPrefix + backdropPath;

    const topMovieTitle = selectElement<HTMLDivElement>(
      ".top-rated-movie .title"
    );
    const topMovieRateValue = selectElement<HTMLSpanElement>(
      ".top-rated-movie .rate-value"
    );
    const backgroundOverlay = selectElement<HTMLDivElement>(
      ".background-container .overlay"
    );

    topMovieTitle.textContent = title;
    topMovieRateValue.textContent = String(voteAverage);
    backgroundOverlay.style.backgroundImage = `url("${movieBackdropUrl}")`;
  }

  static hiddenTitleMovie() {
    const overlay = selectElement<HTMLDivElement>(".overlay");
    const topRatedContainer = selectElement<HTMLDivElement>(".top-rated-movie");
    const backgroundContainer = selectElement<HTMLDivElement>(
      ".background-container"
    );

    overlay.style.display = "none";
    topRatedContainer.style.display = "none";
    backgroundContainer.style.height = "auto";
  }
}

export default Banner;
