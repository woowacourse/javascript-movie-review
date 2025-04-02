import { MovieItemType, storedDetailMovieItemType } from "../types/movieResultType";
import filledStar from "../../public/images/star_filled.png";
import DetailModalView from "../view/detailModalView";
import { DetailModalControllerType } from "../types/controllerType";

class DetailModalController {
  updateStarScore;
  detailModalView;

  constructor({ mainElement, updateStarScore }: DetailModalControllerType) {
    this.updateStarScore = updateStarScore;
    this.detailModalView = new DetailModalView(mainElement);
  }

  initialize(movieItem: MovieItemType | storedDetailMovieItemType) {
    this.detailModalView.renderDetailModal(movieItem);
    this.bindEvents();
    this.detailModalView.show();
  }

  bindEvents() {
    const detailModal = this.detailModalView.getDetailModalElement();

    detailModal.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      // 바깥 영역 클릭 시 모달 닫기
      if (target === event.currentTarget) {
        detailModal.close();
        return;
      }

      // 별 클릭 시
      if (target.closest(".star-wrapper")) {
        const score = this.handleStarClick(target);
        const movieId = this.detailModalView.getMovieIdFromModal();
        this.updateStarScore(movieId, score);
      }
    });
  }

  handleStarClick(target: HTMLElement): number {
    const index = this.detailModalView.getClickedStarIndex(target);
    const allStars = this.detailModalView.getDetailModalElement().querySelectorAll(".star-wrapper img");
    const isActive = allStars[index].getAttribute("src") === filledStar;

    const score = this.detailModalView.updateStars(index, isActive);
    this.detailModalView.updateRatingText(score);
    return score;
  }
}
export default DetailModalController;
