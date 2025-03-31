import MovieDetailModel from "../domain/MovieDetailModel";
import DetailModalView from "../view/DetailModalView";

class DetailModalController {
  #model;
  #view;

  #onErrorModalOpen;

  constructor({ onErrorModalOpen }: { onErrorModalOpen: (error: Error) => void }) {
    this.#model = MovieDetailModel();
    this.#view = new DetailModalView();

    this.#onErrorModalOpen = onErrorModalOpen;
  }

  async showModal(movieId: number) {
    try {
      this.#view.renderLoading();

      const movieDetail = await this.#model.getMovieDetailById(movieId);

      this.#view.renderDetailModalWhenReady(movieDetail, () => {
        this.#view.bindCloseEvents(() => this.closeModal());
        this.#view.bindStarEvents(movieId, this.#model.updateStarScore);
      });
    } catch (error) {
      this.#onErrorModalOpen(error as Error);
    }
  }

  closeModal() {
    this.#view.remove();
  }
}
export default DetailModalController;
