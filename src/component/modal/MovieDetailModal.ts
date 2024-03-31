import { ModalParams } from '../../interface/ModalInterface';
import { MovieDetailData, UserScoreParams } from '../../interface/MovieInterface';
import Modal from './Modal';
import MovieDetailContainer from '../MovieDetailContainer';

interface MovieDetailModalParams extends ModalParams {
  onUpdateUserScore: ({ movieId, userScore }: UserScoreParams) => void;
}

export default class MovieDetailModal extends Modal {
  private onUpdateUserScore;

  constructor({ title, id, onUpdateUserScore }: MovieDetailModalParams) {
    super({ title, id });
    this.onUpdateUserScore = onUpdateUserScore;
  }

  renderMovieDetailContainer({ movie }: { movie: MovieDetailData }) {
    const movieDetailContainer = new MovieDetailContainer({
      movie,
      onClose: () => this.closeModal(),
      onUpdateUserScore: ({ movieId, userScore }: UserScoreParams) => this.onUpdateUserScore({ movieId, userScore }),
    });
    this.modalContainer.append(movieDetailContainer.render());
  }

  closeModal() {
    this.clearContainer();
    this.modal.close();
  }

  private clearContainer() {
    while (this.modalContainer.firstChild) {
      this.modalContainer.removeChild(this.modalContainer.firstChild);
    }
  }
}
