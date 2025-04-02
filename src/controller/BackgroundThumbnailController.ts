import { MovieItemType } from "../types/movieResultType";
import BackgroundThumbnailView from "../view/backgroundThumbnailView";

class BackgroundThumbnailController {
  openDetailModal;
  BackgroundThumbnailView;

  constructor({ mainElement, openDetailModal }: { mainElement: HTMLElement; openDetailModal: (id: number) => void }) {
    this.openDetailModal = openDetailModal;
    this.BackgroundThumbnailView = new BackgroundThumbnailView(mainElement);
  }

  async initialize(movieItem: MovieItemType) {
    this.BackgroundThumbnailView.renderBackgroundThumbnail(movieItem);
    this.clickDetailButton(movieItem);
  }

  clickDetailButton(movieItem: MovieItemType) {
    const detailButtonElement = this.BackgroundThumbnailView.getDetailButton();
    detailButtonElement.addEventListener("click", () => this.openDetailModal(movieItem.id));
  }
}

export default BackgroundThumbnailController;
