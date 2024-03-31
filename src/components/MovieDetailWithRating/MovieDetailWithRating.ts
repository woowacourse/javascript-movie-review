import "./style.css";

import MovieDescription from "../MovieDescription/MovieDescription";
import MovieThumbnail from "../MovieThumbnail/createMovieThumbnail";
import StarRating from "../StarRating/StarRating";
import createElement from "../../utils/createElement";

const RATING_MESSAGES = {
  "0": "별점 미등록",
  "2": "최악이에요",
  "4": "별로예요",
  "6": "보통이에요",
  "8": "재밌어요",
  "10": "명작이에요",
} as const;

type Rating = keyof typeof RATING_MESSAGES;

class MovieDetailWithRating {
  element = createElement("section", {
    attrs: { class: "movie-detail-with-rating" },
  });

  constructor(option?: {
    thumbnailSrc?: string;
    genres?: string[];
    rating?: number;
    description?: string;
    setRatingAction?: (rating: number) => void;
    userRating?: Rating;
  }) {
    const {
      thumbnailSrc = "",
      genres,
      rating,
      description,
      setRatingAction = (rating: number) => {},
      userRating = "0",
    } = option ?? {};

    const thumbnail = new MovieThumbnail(thumbnailSrc, "썸네일");
    thumbnail.element.classList.add("movie-thumbnail");
    const movieDescription = new MovieDescription({
      genres,
      rating,
      description,
    });
    const ratingContainer = this.#createRatingContainer(
      userRating,
      setRatingAction
    );

    const notPosterContainer = createElement("section", {
      attrs: { class: "movie-detail-with-rating__not-poster-container" },
    });
    notPosterContainer.append(movieDescription.element, ratingContainer);
    this.element.append(thumbnail.element, notPosterContainer);
  }

  #createRatingContainer(
    userRating: Rating,
    setRatingAction: (rating: number) => void
  ) {
    const container = createElement("section", {
      attrs: { class: "movie-detail-with-rating__rating-container" },
    });
    const title = createElement("h2", {
      attrs: { class: "movie-detail-with-rating__rating-container__title" },
      content: "내 별점",
    });
    const starRating = new StarRating({ starNumber: 5, increase: 2, start: 2 });
    if (userRating !== "0") starRating.value = Number(userRating);
    const ratingMsg = createElement("p", {
      content: this.#getRatingMsg(userRating),
    });
    starRating.element.addEventListener("click", () => {
      const rating = starRating.value.toString() as Rating;
      ratingMsg.textContent = this.#getRatingMsg(rating);
      setRatingAction(Number(rating));
    });

    container.append(title, starRating.element, ratingMsg);

    return container;
  }

  #getRatingMsg(rating: Rating) {
    return `${rating.padEnd(3, "  ")}${RATING_MESSAGES[rating]}`;
  }
}

export default MovieDetailWithRating;
