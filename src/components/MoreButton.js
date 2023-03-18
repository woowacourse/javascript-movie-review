import { Store } from '../Store';

class MoreButton {
  $button = document.createElement('button');

  constructor($target) {
    this.$button.className = 'btn primary full-width more-button';

    this.render($target);

    this.$button.addEventListener('click', this.onClickMoreButton);
  }

  render($target) {
    this.$button.innerText = '더 보기';
    $target.insertAdjacentElement('beforeend', this.$button);
  }

  onClickMoreButton() {
    const { nextPage, category, query } = Store.movieStates.getMovieStates();

    if (category === 'popular') {
      Store.movieStates.renderPopularMovies(nextPage);

      return;
    }

    Store.movieStates.renderSearchedMovies(query, nextPage);
  }

  hide() {
    this.$button.classList.add('hidden');
  }

  show() {
    this.$button.classList.remove('hidden');
  }
}

export default MoreButton;
