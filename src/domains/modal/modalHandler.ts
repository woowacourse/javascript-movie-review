import { getPosterUrl } from "../../utils/getPosterUrl";
import { MovieDetail } from "../../../types/type";
import { ICON_PATH } from "../../constants/imagePaths";

const movieRatingUtil = {
  getRatings() {
    const ratings = localStorage.getItem("movie_rate");
    return ratings ? JSON.parse(ratings) : {};
  },

  getRating(movieId: number) {
    const ratings = this.getRatings();
    return ratings[movieId] || 0;
  },

  saveRating(movieId: number, rating: number) {
    const ratings = this.getRatings();
    ratings[movieId] = rating;
    localStorage.setItem("movie_rate", JSON.stringify(ratings));
  },
};

const handleModal = {
  open() {
    const $modal = document.getElementById("modalBackground");
    if (!$modal) return;

    $modal.classList.add("active");
    document.body.classList.add("modal-open");
  },

  close() {
    const $modal = document.getElementById("modalBackground");
    if (!$modal) return;

    $modal.classList.remove("active");
    document.body.classList.remove("modal-open");
  },

  updateModalContent(movieData: MovieDetail) {
    const $modal = document.getElementById("modalBackground");
    if (!$modal) return;

    const posterUrl = getPosterUrl(movieData.poster_path);

    (window as any).currentMovieId = movieData.id;

    const $image = $modal.querySelector(".modal-image img") as HTMLImageElement;
    if ($image) $image.src = posterUrl;

    const $title = $modal.querySelector(".modal-description h2");
    if ($title) $title.textContent = movieData.title;

    const $category = $modal.querySelector(".category");
    if ($category)
      $category.textContent =
        movieData.release_year + " · " + movieData.genres.join(", ") || "";

    const $rateValue = $modal.querySelector(".rate span");
    if ($rateValue)
      $rateValue.textContent = movieData.vote_average?.toFixed(1) || "0.0";

    const $detail = $modal.querySelector(".detail");
    if ($detail)
      $detail.textContent = movieData.overview || "(줄거리 내용이 없습니다.)";

    this.loadUserRating(movieData.id);

    this.open();
  },

  loadUserRating(movieId: number) {
    const ratingValue = movieRatingUtil.getRating(movieId);
    this.updateStars(ratingValue);
  },

  updateStars(ratingValue: number) {
    for (let i = 1; i <= 5; i++) {
      const star = document.getElementById(
        `userRateStar${i}`
      ) as HTMLImageElement;
      if (star) {
        star.src =
          i <= ratingValue ? ICON_PATH.STAR_FILLED : ICON_PATH.STAR_EMPTY;
      }
    }
    this.updateRatingText(ratingValue);
  },

  updateRatingText(ratingValue: number) {
    const ratingTexts = [
      "내 평점을 남겨주세요",
      "최악이예요",
      "별로예요",
      "보통이에요",
      "재미있어요",
      "명작이예요",
    ];

    const $rateText = document.getElementById("userRateText");
    const $rateValue = document.getElementById("userRateValue");

    if ($rateText) {
      $rateText.textContent = ratingTexts[ratingValue];
    }

    if ($rateValue) {
      $rateValue.textContent = `(${ratingValue * 2}/10)`;
    }
  },

  saveRating(movieId: number, rating: number) {
    movieRatingUtil.saveRating(movieId, rating);
    this.updateStars(rating);
  },
};

export default handleModal;
