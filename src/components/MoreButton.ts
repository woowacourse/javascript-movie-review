import stateRender from '../renderer/StateRender';

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
    const states = stateRender.getMovieState();
    const { nextPage, category, query } = states;
    console.log(nextPage, '@');
    if (category === 'popular') {
      stateRender.renderPopularMovies(nextPage);
      return;
    }

    stateRender.renderSearchedMovies(query, nextPage);
  }

  hide() {
    this.$button.classList.add('hidden');
  }

  show() {
    this.$button.classList.remove('hidden');
  }
}

export default MoreButton;
