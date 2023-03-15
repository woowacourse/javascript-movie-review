import Movie from './Movie';

class Main {
  #element;
  #manager;

  constructor (element, manager) {
    this.#element = element;
    this.#manager = manager;
  }

  render () {
    const movie = new Movie();
    const query = this.#manager.getQuery();
    this.#element.innerHTML = `
    <h2>${query === '' ? '지금 인기 있는 영화' : `"${query}" 검색 결과`}</h2>
    <ul class="item-list">
    ${this.#manager.getMovieList().map((movieInfo) => movie.template(movieInfo)).join('\n')}
    </ul>
    ${
      this.#manager.isLastPage()
      ? ''
      : '<button class="btn primary full-width">더 보기</button>'
    }
    `;
  }
}

export default Main;
