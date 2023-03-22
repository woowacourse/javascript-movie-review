import { Store } from '../Store';
import { eventThrottle } from '../utils/throttle';

class MoreButton {
  $button = document.createElement('button');

  constructor() {
    this.$button.className = 'btn primary full-width more-button hidden';

    this.$button.addEventListener('click', this.#onClickMoreButton);
  }

  render($target: HTMLElement) {
    this.$button.innerText = '더 보기';
    $target.insertAdjacentElement('beforeend', this.$button);
  }

  #onClickMoreButton() {
    const movieState = Store.get('movieStates');
    if (!movieState) return;

    const states = movieState.getMovieStates();

    if (!states) return;
    const { nextPage, category, query } = states;

    if (category === 'popular') {
      movieState.renderPopularMovies(nextPage);

      return;
    }

    movieState.renderSearchedMovies(query, nextPage);
  }

  hide() {
    this.$button.classList.add('hidden');
  }

  show() {
    this.$button.classList.remove('hidden');
  }
}

export default MoreButton;
