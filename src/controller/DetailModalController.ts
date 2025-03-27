import DetailModal from "../component/DetailModal";
import { MovieItemType } from "../types/movieResultType";

class DetailModalController {
  mainElement;
  detailModalElement?: HTMLDialogElement;

  constructor(mainElement: HTMLElement) {
    this.mainElement = mainElement;
  }

  bindEvents() {
    if (!this.detailModalElement) return;

    this.detailModalElement.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.detailModalElement?.close();
    });
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
