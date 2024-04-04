import "./style.css";

import { NO_SYNOPSIS_MESSAGE } from "./constant";
import createElement from "../../utils/createElement";
import starFilled from "./star_filled.png";

class MovieDescription {
  element = createElement("section", { attrs: { class: "movie-description" } });

  constructor(option?: {
    genres?: string[];
    rating?: number;
    description?: string;
  }) {
    const {
      genres = ["장르 없음"],
      rating = 0,
      description = NO_SYNOPSIS_MESSAGE,
    } = option ?? {};
    const genreRatingParagraph = this.#createGenreRatingParagraph(
      genres,
      rating
    );
    this.element.append(
      genreRatingParagraph,
      description.trim() ? description : NO_SYNOPSIS_MESSAGE
    );
  }

  #createGenreRatingParagraph(genre: string[], rating: number) {
    const genreRatingParagraph = createElement("p", {
      attrs: { class: "movie-description__genre-rating" },
    });
    const starImg = createElement("img", {
      attrs: {
        src: starFilled,
        alt: "별점",
      },
    });

    genreRatingParagraph.append(genre.join(", "), starImg, rating.toFixed(1));

    return genreRatingParagraph;
  }
}

export default MovieDescription;
