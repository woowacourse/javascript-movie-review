import { MovieDetail } from "../../../types/Type";
import createModalContent from "./ModalContent";
import renderStars from "./StarRatings";
import "/styles/modal.css";

class Modal {
  modalElement: HTMLDialogElement;
  closeButton: HTMLButtonElement;
  movieId: number;

  $stars!: any;
  $score!: HTMLElement;
  $comment!: any;

  constructor(movieDetail: MovieDetail, id: number) {
    this.movieId = id;
    this.modalElement = document.getElementById(
      "modalBackground"
    ) as HTMLDialogElement;

    const { $modal, $stars, $score, $comment } =
      createModalContent(movieDetail);
    this.modalElement.replaceChildren($modal);
    this.$stars = $stars;
    this.$score = $score;
    this.$comment = $comment;

    this.closeButton = document.getElementById(
      "closeModal"
    ) as HTMLButtonElement;

    const saved = JSON.parse(localStorage.getItem("myRating")!) ?? {};
    const rateValue = Number(saved[this.movieId]) || 0;
    this.renderStars(rateValue);

    this.open();
    this.addEventListeners();
  }

  renderStars = (rating: number) => {
    renderStars(
      rating,
      this.$stars,
      this.$score,
      this.$comment,
      this.movieId,
      this.renderStars
    );
  };

  open() {
    this.modalElement.showModal();
    document.body.classList.add("modal-open");
  }

  close() {
    this.modalElement.close();
    document.body.classList.remove("modal-open");
  }

  addEventListeners() {
    this.closeButton.addEventListener("click", () => this.close());
    this.modalElement.addEventListener("click", (e: MouseEvent) => {
      if (e.target === this.modalElement) {
        this.close();
      }
    });
  }
}

export default Modal;
