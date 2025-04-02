import DetailModal from "../components/DetailModal/DetailModal";
import { MovieItemType, storedDetailMovieItemType } from "../types/movieResultType";
import filledStar from "../../public/images/star_filled.png";
import emptyStar from "../../public/images/star_empty.png";
import { RATING_MESSAGE } from "../constant/ratingMessage";

class DetailModalView {
  mainElement;
  detailModalElement!: HTMLDialogElement;

  constructor(mainElement: HTMLElement) {
    this.mainElement = mainElement;
  }

  renderDetailModal(movieItem: MovieItemType | storedDetailMovieItemType) {
    if (this.detailModalElement?.isConnected) {
      this.detailModalElement.remove();
    }
    this.detailModalElement = DetailModal(movieItem) as HTMLDialogElement;
    this.mainElement.insertAdjacentElement("afterend", this.detailModalElement);
  }

  show() {
    this.detailModalElement.showModal();
  }

  getDetailModalElement(): HTMLDialogElement {
    return this.detailModalElement;
  }

  getMovieIdFromModal(): number {
    const modalContainer = this.detailModalElement.querySelector(".modal-container") as HTMLElement;
    return Number(modalContainer?.id);
  }

  getClickedStarIndex(target: HTMLElement): number {
    const allStars = Array.from(this.detailModalElement.querySelectorAll(".star-wrapper img"));
    return allStars.indexOf(target as HTMLImageElement);
  }

  updateStars(clickedIndex: number, isActive: boolean) {
    const allStars = Array.from(this.detailModalElement.querySelectorAll(".star-wrapper img"));
    allStars.forEach((img, index) => {
      if (isActive) {
        img.setAttribute("src", index >= clickedIndex ? emptyStar : img.getAttribute("src")!);
      } else {
        img.setAttribute("src", index <= clickedIndex ? filledStar : emptyStar);
      }
    });

    return allStars.filter((img) => img.getAttribute("src") === filledStar).length * 2;
  }

  updateRatingText(score: number) {
    const ratingMent = this.detailModalElement.querySelector(".star-description-ment .rating-ment") as HTMLSpanElement;
    const ratingNumber = this.detailModalElement.querySelector(
      ".star-description-ment .rating-number",
    ) as HTMLSpanElement;

    ratingMent.textContent = RATING_MESSAGE[score];
    ratingNumber.textContent = score === 0 ? "" : `(${score}/10)`;
  }
}

export default DetailModalView;
