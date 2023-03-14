import MovieItem from './MovieItem';

class MovieList {
  private _node!: HTMLElement;
  // private movies: string[];
  private moviesType: string = '지금 인기있는 영화';

  constructor() {
    this.createTemplate();
  }

  get node(): HTMLElement {
    return this._node;
  }

  createTemplate(): this {
    this._node = document.createElement('main');

    this.paintMovieList();

    const movie = new MovieItem();
    this._node.querySelector('ul')?.insertAdjacentElement('afterbegin', movie.node);

    return this;
  }

  paintMovieList() {
    this._node.innerHTML = `
    <main>
      <section class="item-view">
      <h2>${this.moviesType}</h2>
      <ul class="item-list">
      </ul>
      <button class="btn primary full-width">더 보기</button>
      </section>
    </main>
    `;
  }

  changeMoivesType(search: string) {
    this.moviesType = `${search} 검색 결과`;

    this.paintMovieList();
  }
}

export default MovieList;
