import { RatingStorage } from "../storage/RatingStorage";

const RATING_LABELS: Record<number, string> = {
  0: "",
  1: "최악이예요",
  2: "별로예요",
  3: "보통이에요",
  4: "재미있어요",
  5: "명작이에요",
};

class Review {
  #elements: {
    stars: NodeListOf<HTMLButtonElement>;
    scoreEl: HTMLSpanElement;
    labelEl: HTMLElement;
  };
  #state: { selectedRating: number; movieId: number };
  #storage: RatingStorage;

  constructor(storage: RatingStorage) {
    const stars = document.querySelectorAll<HTMLButtonElement>(".rating-star");
    const scoreEl = document.querySelector<HTMLSpanElement>(".rating-score");
    const labelEl = document.querySelector<HTMLElement>(".rating-text");

    if (!stars.length || !scoreEl || !labelEl) {
      throw new Error("별점 요소를 찾을 수 없습니다.");
    }

    this.#elements = { stars, scoreEl, labelEl };
    this.#state = { selectedRating: 0, movieId: 0 };
    this.#storage = storage;
  }

  load(movieId: number) {
    this.#state.movieId = movieId;
    this.#state.selectedRating = this.#storage.get(movieId);
    this.#renderStars(this.#state.selectedRating);
    this.#updateText(this.#state.selectedRating);
  }

  bindEvent() {
    this.#elements.stars.forEach((star) => {
      star.addEventListener("click", () => {
        this.#state.selectedRating = Number(star.dataset.value);
        this.#storage.save(this.#state.movieId, this.#state.selectedRating);
        this.#renderStars(this.#state.selectedRating);
        this.#updateText(this.#state.selectedRating);
      });

      star.addEventListener("mouseover", () => {
        this.#renderStars(Number(star.dataset.value));
      });
    });

    document
      .querySelector(".rating-stars")
      ?.addEventListener("mouseleave", () => {
        this.#renderStars(this.#state.selectedRating);
      });
  }

  #renderStars(rating: number) {
    this.#elements.stars.forEach((star) => {
      const value = Number(star.dataset.value);
      star.classList.toggle("filled", value <= rating);
    });
  }

  #updateText(rating: number) {
    this.#elements.scoreEl.textContent = `(${rating * 2}/10)`;
    this.#elements.labelEl.firstChild!.textContent = RATING_LABELS[rating] + " ";
  }
}

export default Review;
