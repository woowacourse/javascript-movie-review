import Store from '../Store';

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
    const { nextPage, category, query } = Store.state;

    if (category === 'popular') {
      Store.updatePopularMovies(nextPage);

      return;
    }

    Store.updateSearchedMoviesByQuery(query, nextPage);
  }

  hide() {
    this.$button.classList.add('hidden');
  }

  show() {
    this.$button.classList.remove('hidden');
  }
}

export default MoreButton;
