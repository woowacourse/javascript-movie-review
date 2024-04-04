import Modal from '../modal/Modal';
import { fetchMovieDetail } from '../../apis/getMovieData';
import filledStar from '../../images/star_filled.png';
import emptyStar from '../../images/star_empty.png';
import { Movie } from '../../interface/Movie';
import { LOCALSTORAGE_KEY, RATING_MESSAGES } from '../../constants/constant';
import MovieDetailContent from './MovieDetailContent';
import localStorageService from '../../utils/localStorageService';

class MovieDetailModal extends Modal {
  #movieId: number;
  #movie: any;
  #userMovies: Movie[] = [];

  constructor(movieId: number) {
    super();
    this.#movieId = movieId;
    this.#userMovies = localStorageService.getValue(LOCALSTORAGE_KEY.USER_MOVIES);
    this.renderMovieDetail();
  }

  async renderMovieDetail() {
    this.#movie = await fetchMovieDetail(this.#movieId);
    this.#movie.userVote = this.getUserVote();
    const movieDetailContent = new MovieDetailContent(this.#movie);
    this.setContent(movieDetailContent.render());

    this.manageModalClose();
    this.manageUserVote();
  }

  getUserVote() {
    const existingMovie = this.#userMovies.find(item => item.id === this.#movie.id);
    return existingMovie ? existingMovie.userVote : 0;
  }

  manageModalClose() {
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') this.close();
    });

    const closeButton = document.querySelector('.close-btn');
    if (!closeButton) return;
    closeButton.addEventListener('click', () => this.close());
  }

  manageUserVote() {
    const starsContainer = document.querySelector('.detail-stars')!;
    const voteNumber = document.querySelector('.detail-vote-number');
    const voteText = document.querySelector('.detail-vote-text');
    if (!starsContainer || !voteNumber || !voteText) return;

    this.renderUserVote(starsContainer, voteNumber, voteText);

    starsContainer.addEventListener('click', event => {
      const target = event.target;
      if (target instanceof HTMLImageElement) {
        const clickedIndex = Array.from(starsContainer.children).indexOf(target);
        const userVote = (clickedIndex + 1) * 2;
        this.#movie.userVote = this.#movie.userVote === userVote ? 0 : userVote;

        this.renderUserVote(starsContainer, voteNumber, voteText);
        this.updateUserMovie();
      }
    });
  }

  renderUserVote(starsContainer: Element, voteNumber: Element, voteText: Element) {
    starsContainer.querySelectorAll('img').forEach((img: HTMLImageElement, index: number) => {
      img.src = index < this.#movie.userVote / 2 ? filledStar : emptyStar;
    });

    const userVote = String(this.#movie.userVote);
    voteNumber.textContent = userVote;
    voteText.textContent = RATING_MESSAGES[userVote];
  }

  updateUserMovie() {
    const existingMovieIndex = this.#userMovies.findIndex(item => item.id === this.#movie.id);
    if (existingMovieIndex !== -1) {
      this.#userMovies[existingMovieIndex].userVote = this.#movie.userVote;
    } else {
      const newUserMovie: Movie = { ...this.#movie, userVote: this.#movie.userVote };
      this.#userMovies.push(newUserMovie);
    }

    localStorageService.setValue(LOCALSTORAGE_KEY.USER_MOVIES, this.#userMovies);
  }
}

export default MovieDetailModal;
