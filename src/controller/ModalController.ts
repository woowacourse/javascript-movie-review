import MovieStorage from '../domains/MovieStorage';
import MovieInfoModal from '../components/MovieInfoModal';
import EventDispatcher from '../EventDispatcher';
import ratingLocalStorage from '../domains/RatingLocalStorage';
import { $ } from '../utils/domSelector';

class ModalController {
  private movieInfoModal: MovieInfoModal;

  constructor() {
    EventDispatcher.setEvent('openInfoModal', this.openInfoModalWithMovieId);
    EventDispatcher.setEvent('setUserRating', this.setUserMovieRating);
    this.movieInfoModal = new MovieInfoModal({
      parentElement: $('#app'),
      onRatingRequestEvent: this.getUserMovieRating,
    });
  }

  openInfoModalWithMovieId = (movieId: number) => {
    const movieInfo = MovieStorage.getMovieById(movieId);

    if (!(movieInfo instanceof Error)) {
      this.movieInfoModal.openInfoModalWithInfo(movieInfo);
    }
  };

  setUserMovieRating(movieId: number, rating: number) {
    ratingLocalStorage.setMovieRating(movieId, rating);
  }

  getUserMovieRating(movieId: number) {
    return ratingLocalStorage.getMovieRating(movieId);
  }
}

export default ModalController;
