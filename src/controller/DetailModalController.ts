import DetailModal from "../component/DetailModal";
import { RATING_MESSAGE } from "../constant/ratingMessage";
import { MovieItemType } from "../types/movieResultType";
import filledStar from "../../public/images/star_filled.png";
import emptyStar from "../../public/images/star_empty.png";

class DetailModalController {
  mainElement;
  detailModalElement?: HTMLDialogElement;

  constructor(mainElement: HTMLElement) {
    this.mainElement = mainElement;
  }

  bindEvents() {
    if (!this.detailModalElement) return;

    this.detailModalElement.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      // 바깥 영역 클릭 시 모달 닫기
      if (target === event.currentTarget) {
        this.detailModalElement?.close();
        return;
      }

      // 별 클릭 시
      if (target.closest(".star-wrapper")) {
        this.handleStarClick(target);
      }
    });
  }

  handleStarClick(target: HTMLElement) {
    const allStars = Array.from(this.detailModalElement!.querySelectorAll(".star-wrapper img"));
    const clickedIndex = allStars.indexOf(target as HTMLImageElement);

    const clickedStar = allStars[clickedIndex] as HTMLImageElement;
    const isActive = clickedStar.getAttribute("src") === filledStar;

    allStars.forEach((img, index) => {
      if (isActive) {
        img.setAttribute("src", index >= clickedIndex ? emptyStar : img.getAttribute("src")!);
      } else {
        img.setAttribute("src", index <= clickedIndex ? filledStar : emptyStar);
      }
    });

    const newScore = allStars.filter((img) => img.getAttribute("src") === filledStar).length * 2;

    const ratingMent = this.detailModalElement!.querySelector(".star-description-ment .rating-ment") as HTMLSpanElement;
    const ratingNumber = this.detailModalElement!.querySelector(
      ".star-description-ment .rating-number",
    ) as HTMLSpanElement;

    ratingMent.textContent = RATING_MESSAGE[newScore];
    ratingNumber.textContent = newScore === 0 ? "" : `${newScore}`;
  }

  renderDetailModalFrame(movieItem: MovieItemType) {
    // 기존 모달 제거
    if (this.detailModalElement?.isConnected) {
      this.detailModalElement.remove();
    }

    // 새 모달 생성
    this.detailModalElement = DetailModal(movieItem) as HTMLDialogElement;
    this.mainElement.insertAdjacentElement("afterend", this.detailModalElement);
    this.bindEvents();
    this.detailModalElement.showModal();
  }

  changeContent(movieItem: MovieItemType) {
    this.renderDetailModalFrame(movieItem);
  }
}
export default DetailModalController;
