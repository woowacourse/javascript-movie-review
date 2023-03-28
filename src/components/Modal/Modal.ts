import "./style.css";
import { IMovie } from "../../domain/Movie";
import EmptyStarIcon from "../../images/star_empty.png";
import FilledStarIcon from "../../images/star_filled.png";
import NotFoundImageIcon from "../../images/not_found_image.png";
import { $, $$ } from "../../utils/querySelelctor";
import { getRatings, setLocalStorageItem } from "../../utils/localStorageUtils";
import { IRatings } from "../../types/IRatings";
import showToastWithMessage from "../../utils/showToastWithMessage";

class Modal {
  $target: HTMLDivElement;
  #movie: IMovie | null;
  #isAlreadyRated: boolean;

  constructor(target: HTMLDivElement) {
    this.$target = target;
    this.#movie = null;
    this.#isAlreadyRated = true;

    this.render();
    this.setEvent();
  }

  template() {
    return `
      <div class="modal-wrapper">
        <div class="modal modal-invisible">
          <div class="modal-backdrop"></div>
          <div class="modal-container">
            <div class="modal-content">
              <!-- Your modal content here -->
            </div>
            <button class="close-button"></button>
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
    this.#movie = movie;

    if ($modalContent instanceof HTMLDivElement) {
      const ratings: IRatings = getRatings() as IRatings;

      const storedRating = ratings[movie.id] || 0;
      const stars = this.renderStars(+storedRating);

      this.#isAlreadyRated = !!storedRating;

      $modalContent.innerHTML = `
    <div class="modal-head"><h2>${movie.title}</h2></div>
    <div class="flex-container">
      <div class="modal-left-container">
        <img class="modal-image" src="${movie.posterSrc || NotFoundImageIcon}" alt="${
        movie.title
      } poster">
      </div>
      <div class="modal-right-container">
        <div class="category-container">
          <p class="modal-genre">${movie.genre}</p>
          <img src="${FilledStarIcon}" alt="rating star">
          <p>${movie.voteAverage}</p>
        </div>
        <p class="modal-overview">${movie.overview || "Sorry, there's no movie overview :("}</p>
        <div class="user-rate-container" data-movie-id="${movie.id}">
          <span class="rating-header">내 별점</span>
          ${stars}
          <span class="score">${storedRating ? storedRating : ""}</span>
          <span class="score-comment">${
            storedRating ? this.getScoreComment(+storedRating) : ""
          }</span>
          <button class="re-rate-button hidden">초기화</button>
        </div>
      </div>
    </div>
  `;
    }

    this.bindEvents();
    this.toggleReRateButtonVisibility();
  }

  updateStarsAndComments(
    stars: Array<HTMLImageElement>,
    rating: number,
    scoreElement: Element | null,
    ratingCommentElement: Element | null
  ) {
    stars.forEach((star, i) => {
      star.src = i * 2 + 2 <= rating ? FilledStarIcon : EmptyStarIcon;
    });

    if (!scoreElement || !ratingCommentElement) return;

    scoreElement.textContent = rating ? rating.toString() : "";
    ratingCommentElement.textContent = rating ? this.getScoreComment(rating) : "";
  }

  updateRating(movieId: string, rating: number) {
    const $userRateContainer = $(".user-rate-container", this.$target);
    if (!$userRateContainer) return;

    const scoreElement = $(".score", $userRateContainer);
    if (!scoreElement) return;

    const ratingCommentElement = $(".score-comment", $userRateContainer);
    if (!ratingCommentElement) return;

    const stars: Array<HTMLImageElement> = Array.from($$("img", $userRateContainer));
    this.updateStarsAndComments(stars, rating, scoreElement, ratingCommentElement);
  }

  show() {
    const $modal = $(".modal", this.$target);

    if ($modal instanceof HTMLDivElement) {
      $modal.classList.remove("modal-invisible");
    }
  }

  hide() {
    const $modal = $(".modal", this.$target);

    if ($modal instanceof HTMLDivElement) {
      $modal.classList.add("modal-invisible");
    }
  }

  setEvent() {
    const $modal = $(".modal", this.$target);
    const $modalBackdrop = $(".modal-backdrop", this.$target);
    const $closeButton = $(".close-button", this.$target);

    if ($modalBackdrop instanceof HTMLDivElement) {
      $modalBackdrop.addEventListener("click", this.hide);
    }

    if ($closeButton) {
      $closeButton.addEventListener("click", this.hide);
    }

    if ($modal) {
      window.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          this.hide();
        }
      });
    }
  }

  toggleReRateButtonVisibility() {
    const $reRateButton = $(".re-rate-button", this.$target);
    if ($reRateButton instanceof HTMLButtonElement) {
      if (this.#isAlreadyRated) {
        $reRateButton.classList.remove("hidden");
      } else {
        $reRateButton.classList.add("hidden");
      }
    }
  }

  bindEvents() {
    const $userRateContainer = $(".user-rate-container", this.$target);
    const $reRateButton = $(".re-rate-button", this.$target);

    if ($reRateButton) {
      $reRateButton.addEventListener("click", (e) => {
        showToastWithMessage("성공적으로 별점이 초기화되었습니다. ❌");

        if (e.target instanceof HTMLButtonElement) {
          const movieId = this.#movie?.id;

          if (movieId) {
            const ratings: IRatings = getRatings() as IRatings;
            delete ratings[movieId];
            setLocalStorageItem("ratings", ratings);
            this.updateRating(movieId, 0);

            this.#isAlreadyRated = false;
            this.toggleReRateButtonVisibility();
          }
        }
      });
    }

    if ($userRateContainer) {
      $userRateContainer.addEventListener("mouseover", (e) => {
        if (this.#isAlreadyRated) return;
        if (!(e.target instanceof HTMLImageElement)) return;

        const rating = parseInt(e.target.dataset.value ?? "0", 10);
        const stars: Array<HTMLImageElement> = Array.from($$("img", $userRateContainer));
        const scoreElement = $(".score", $userRateContainer);
        const ratingCommentElement = $(".score-comment", $userRateContainer);

        this.updateStarsAndComments(stars, rating, scoreElement, ratingCommentElement);

        if (scoreElement && ratingCommentElement) {
          scoreElement.textContent = rating.toString();
          ratingCommentElement.textContent = this.getScoreComment(rating);
        }
      });

      $userRateContainer.addEventListener("mouseout", (e) => {
        if (this.#isAlreadyRated) return;
        const movieId = (e.currentTarget as HTMLElement)?.dataset.movieId ?? "";
        const ratingCommentElement = $(".score-comment", $userRateContainer);
        const ratings: IRatings = getRatings() as IRatings;
        const stars: Array<HTMLImageElement> = Array.from($$("img", $userRateContainer));
        const scoreElement = $(".score", $userRateContainer);

        this.updateStarsAndComments(stars, 0, scoreElement, ratingCommentElement);

        const storedRating = ratings[movieId] || 0;

        if (scoreElement && ratingCommentElement) {
          scoreElement.textContent = storedRating ? storedRating.toString() : "";
          ratingCommentElement.textContent = this.getScoreComment(+storedRating);
        }
      });

      $userRateContainer.addEventListener("click", (e) => {
        if (!(e.target instanceof HTMLImageElement)) return;

        const movieId = (e.currentTarget as HTMLElement)?.dataset.movieId ?? "";
        const value = e.target.dataset.value ?? "0";

        if (!movieId) return;

        const ratings: IRatings = getRatings() as IRatings;
        if (ratings[movieId] === value) {
          delete ratings[movieId];
          setLocalStorageItem("ratings", ratings);
          showToastWithMessage("성공적으로 별점이 초기화되었습니다. ❌");
          this.#isAlreadyRated = false;
          this.toggleReRateButtonVisibility();
          this.updateRating(movieId, 0);
        } else {
          ratings[movieId] = value;
          setLocalStorageItem("ratings", ratings);
          this.updateRating(movieId, +value);
          this.#isAlreadyRated = true;
          showToastWithMessage("성공적으로 별점이 등록되었습니다. 🫡");
          this.toggleReRateButtonVisibility();
        }
      });
    }
  }
}

export default Modal;
