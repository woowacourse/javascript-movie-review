import stateRender from '../renderer/StateRender';

class ListTitle {
  #$h2 = document.createElement('h2');

  constructor() {
    this.#$h2.className = 'movie-list-title';
  }

  render($target: HTMLElement) {
    const movieState = stateRender.getMovieState();

    this.#$h2.innerHTML =
      movieState.category === 'search' ? `"${movieState?.query}" 검색 결과` : '지금 인기있는 영화';

    $target.insertAdjacentElement('beforeend', this.#$h2);
  }
}

export default ListTitle;
