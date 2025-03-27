import ThumbnailModel from "../model/ThumbnailModel";
import { IMovieItem } from "../types/movieResultType";
import BackgroundThumbnailView from "../view/BackgroundThumbnailView";
import MessageModalView from "../view/MessageModalView";

export default class BackgroundThumbnailViewModel {
  #view;
  #model;
  #modalView;

  constructor(
    view: BackgroundThumbnailView,
    model: ThumbnailModel,
    modalView: MessageModalView,
  ) {
    this.#view = view;
    this.#model = model;
    this.#modalView = modalView;

    this.#model.subscribe(this.#handleModelUpdate.bind(this));
  }

  renderSkeleton() {
    this.#view.renderSkeleton();
  }

  setThumbnail(movie: IMovieItem) {
    const currentThumbnail = this.#model.getValue();
    if (movie !== currentThumbnail) this.#model.setThumbnail(movie);
  }

  #handleModelUpdate(movie: IMovieItem | null) {
    if (!movie) return;
    this.#view.renderBackgroundThumbnail(movie);
    this.#view.bindDetailButtonClick(() => {
      this.#modalView.changeContentMessage("아직 지원되지 않은 기능입니다.");
      this.#modalView.messageModalElement.showModal();
    });
  }
}
