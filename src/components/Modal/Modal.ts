import "./style.css";
import { IMovie } from "../../domain/Movie";
import EmptyStarIcon from "../../images/star_empty.png";
import FilledStarIcon from "../../images/star_filled.png";
import NotFoundImageIcon from "../../images/not_found_image.png";
import { $, $$ } from "../../utils/querySelelctor";
import { getRatings, setLocalStorageItem } from "../../utils/localStorageUtils";
import { IRatings } from "../../types/IRatings";

class Modal {
  $target: HTMLDivElement;

  constructor(target: HTMLDivElement) {
    this.$target = target;

    this.render();
    this.setEvent();
  }

  template() {
    return `
      <div class="modal modal-invisible">
        <div>
            <div class="modal-backdrop"></div>
        <div class="modal-container">
            <div class="modal-content">
            </div>
        </div>
        </div>
      </div>
    `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  renderStars(rating: number) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += `<img data-value="${i * 2}" src="${
        i * 2 <= rating ? FilledStarIcon : EmptyStarIcon
      }" alt="star">`;
    }
    return stars;
  }

  updateStars(stars: Array<HTMLImageElement>, rating: number) {
    stars.forEach((star, i) => {
      star.src = i * 2 + 2 <= rating ? FilledStarIcon : EmptyStarIcon;
    });
  }

  getScoreComment(rating: number) {
    switch (rating) {
      case 2:
        return "최악이예요";
      case 4:
        return "별로예오";
      case 6:
        return "보통이에요";
      case 8:
        return "재미있어요";
      case 10:
        return "명작이에요";
      default:
        return "";
    }
  }

  updateContent(movie: IMovie) {
    const $modalContent = $(".modal-content", this.$target);

    if ($modalContent instanceof HTMLDivElement) {
      const ratings: IRatings = getRatings() as IRatings;

      const storedRating = ratings[movie.id] || 0;
      const stars = this.renderStars(+storedRating);

      $modalContent.innerHTML = `
      <h2>${movie.title}</h2>
      <div class="flex-container">
        <div class="left">
          <img src="${movie.posterSrc || NotFoundImageIcon}" alt="${movie.title} poster">
        </div>
        <div class="right">
          <p>${movie.genre}</p>
          <img src="${FilledStarIcon}" alt="rating star">
          <p>${movie.voteAverage}</p>
          <p>${movie.overview}</p>
          <div class="user-rate-container" data-movie-id="${movie.id}">
            <span class="rating-header">내 별점</span>
            ${stars}
            <span class="score">${storedRating ? storedRating : ""}</span>
            <span class="score-comment">${
              storedRating ? this.getScoreComment(+storedRating) : ""
            }</span>
          </div>
        </div>
      </div>
    `;
    }

    this.bindEvents();
  }

  updateRating(movieId: string, rating: number) {
    const $userRateContainer = $(".user-rate-container", this.$target);
    if (!$userRateContainer) return;

    const scoreElement = $(".score", $userRateContainer);
    if (!scoreElement) return;

    const ratingCommentElement = $(".score-comment", $userRateContainer);
    if (!ratingCommentElement) return;

    const stars: Array<HTMLImageElement> = Array.from($$("img", $userRateContainer));
    this.updateStars(stars, rating);
    scoreElement.textContent = rating ? rating.toString() : "";
    ratingCommentElement.textContent = rating ? this.getScoreComment(rating) : "";
  }

  show() {
    const $modal = this.$target.querySelector(".modal");

    if ($modal instanceof HTMLDivElement) {
      $modal.classList.remove("modal-invisible");
    }
  }

  hide() {
    const $modal = this.$target.querySelector(".modal");

    if ($modal instanceof HTMLDivElement) {
      $modal.classList.add("modal-invisible");
    }
  }

  setEvent() {
    const $modalBackdrop = this.$target.querySelector(".modal-backdrop");

    if ($modalBackdrop instanceof HTMLDivElement) {
      $modalBackdrop.addEventListener("click", () => {
        this.hide();
      });
    }
  }
}

export default Modal;
