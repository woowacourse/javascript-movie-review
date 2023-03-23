import "./style.css";
import { IMovie } from "../../domain/Movie";

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
    const $modalContent = this.$target.querySelector(".modal-content");

    if ($modalContent instanceof HTMLDivElement) {
      $modalContent.innerHTML = `
        <h2>${movie.title}</h2>
        <p>voteAverage: ${movie.voteAverage}</p>
        <p>voteAverage: ${movie.voteAverage}</p>
        <p>Overview: ${movie.overview}</p>
      `;
    }
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
