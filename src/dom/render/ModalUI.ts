import { getMovieDetail, MovieDetail } from "../../apis/movie/api";
import RatingRepository from "../../repository/RatingRepository";
import { getErrorMessage } from "../../utils/getErrorMessage";

type ModalState =
  | { type: "loading" }
  | { type: "data"; movie: MovieDetail }
  | { type: "error"; message: string };

const STAR_EMPTY = "./images/star_empty.png";
const STAR_FILLED = "./images/star_filled.png";
const RATE_LABELS = [
  "",
  "최악이에요",
  "별로예요",
  "보통이에요",
  "재미있어요",
  "명작이에요",
];

class ModalUI {
  modalState: ModalState = { type: "loading" };
  modalBackground = document.getElementById("modalBackground");
  modalCloseButton = document.getElementById("closeModal");
  modalImageContainer = document.getElementById("modal-image");
  modalImage = document.querySelector<HTMLImageElement>("#modal-image img");
  modalTitle = document.getElementById("modal-title");
  modalCategory = document.getElementById("modal-category");
  modalRate = document.getElementById("modal-rate");
  modalDetail = document.getElementById("modal-detail");
  modalRateReview = document.getElementById("modal-rate-review");
  modalRatePoints = document.getElementById("modal-rate-points");
  starEls = [1, 2, 3, 4, 5].map(
    (i) =>
      document.getElementById(
        `modal-my-rate-star-${i}`,
      ) as HTMLImageElement | null,
  );
  currentMovieId: number | null = null;
  myRating = 0;
  ratingRepository: RatingRepository;

  constructor(ratingRepository: RatingRepository) {
    this.ratingRepository = ratingRepository;
    this.hide();
    this.#initStarEvents();
    this.modalCloseButton?.addEventListener("click", () => {
      this.hide();
    });
    this.modalBackground?.addEventListener("click", (e) => {
      if (e.target === this.modalBackground) this.hide();
    });
    document.addEventListener("keydown", (e) => {
      if (
        e.key === "Escape" &&
        !this.modalBackground?.classList.contains("hidden")
      )
        this.hide();
    });
  }

  #initStarEvents() {
    this.starEls.forEach((star, index) => {
      star?.addEventListener("click", () => {
        if (this.currentMovieId === null) return;
        this.myRating = index + 1;
        this.ratingRepository.setRate(this.currentMovieId, this.myRating);
        this.#updateStars();
      });
    });
  }

  #updateStars() {
    this.starEls.forEach((star, index) => {
      if (!star) return;
      star.src = index < this.myRating ? STAR_FILLED : STAR_EMPTY;
    });
    if (this.modalRateReview)
      this.modalRateReview.innerText = RATE_LABELS[this.myRating];
    if (this.modalRatePoints)
      this.modalRatePoints.innerText = this.myRating
        ? `(${this.myRating * 2}/10)`
        : "";
  }

  #setModalState(modalState: ModalState) {
    this.modalState = modalState;
    this.#render();
  }

  #addSkeletonClasses() {
    this.modalImageContainer?.classList.add("modal-skeleton-image");
    this.modalTitle?.classList.add("modal-skeleton", "modal-skeleton-title");
    this.modalCategory?.classList.add(
      "modal-skeleton",
      "modal-skeleton-category",
    );
    this.modalRate?.classList.add("modal-skeleton", "modal-skeleton-rate");
    this.modalDetail?.classList.add("modal-skeleton", "modal-skeleton-detail");
    if (this.modalImage) this.modalImage.src = "";
    if (this.modalTitle) this.modalTitle.innerText = "";
    if (this.modalCategory) this.modalCategory.innerText = "";
    if (this.modalRate) this.modalRate.innerText = "";
    if (this.modalDetail) this.modalDetail.innerText = "";
  }

  #removeSkeletonClasses() {
    this.modalImageContainer?.classList.remove("modal-skeleton-image");
    this.modalTitle?.classList.remove("modal-skeleton", "modal-skeleton-title");
    this.modalCategory?.classList.remove(
      "modal-skeleton",
      "modal-skeleton-category",
    );
    this.modalRate?.classList.remove("modal-skeleton", "modal-skeleton-rate");
    this.modalDetail?.classList.remove(
      "modal-skeleton",
      "modal-skeleton-detail",
    );
  }

  hide() {
    this.modalBackground?.classList.add("hidden");
  }

  async load(movieId: number) {
    this.currentMovieId = movieId;
    this.myRating = this.ratingRepository.getRate(movieId) ?? 0;
    this.#updateStars();
    this.#setModalState({ type: "loading" });
    this.modalBackground?.classList.remove("hidden");
    try {
      const movie = await getMovieDetail(movieId);
      this.#setModalState({ type: "data", movie });
    } catch (error) {
      this.#setModalState({ type: "error", message: getErrorMessage(error) });
    }
  }

  #render() {
    if (this.modalState.type === "loading") {
      this.#addSkeletonClasses();
      return;
    }

    if (this.modalState.type === "error") {
      this.#removeSkeletonClasses();
      if (this.modalDetail)
        this.modalDetail.innerText = this.modalState.message;
      return;
    }

    if (this.modalState.type === "data") {
      this.#removeSkeletonClasses();
      const { movie } = this.modalState;
      const year = movie.release_date.slice(0, 4);
      const genres = movie.genres.map((g) => g.name).join(", ");

      if (this.modalImage)
        this.modalImage.src = `${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`;
      if (this.modalTitle) this.modalTitle.innerText = movie.title;
      if (this.modalCategory)
        this.modalCategory.innerText = `${year} · ${genres}`;
      if (this.modalRate)
        this.modalRate.innerText = String(movie.vote_average.toFixed(1));
      if (this.modalDetail) this.modalDetail.innerText = movie.overview;
    }
  }
}

export default ModalUI;
