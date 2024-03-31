import "./style.css";

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
      description = "제시된 설명이 없습니다.",
    } = option ?? {};
    const genreRatingParagraph = this.#createGenreRatingParagraph(
      genres,
      rating
    );
    this.element.append(genreRatingParagraph, description);
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
