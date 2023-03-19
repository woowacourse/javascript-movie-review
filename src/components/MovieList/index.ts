import template from './index.html';
import { Movie } from '../../types';

export class MovieList extends HTMLElement {
  #$movieItems: HTMLElement;

  constructor() {
    super();
    this.innerHTML = template;
    this.#$movieItems = document.querySelector('.item-list')!;
  }

  setTitle(title: string) {
    const pageTitle = this.querySelector('.page-title');
    if (pageTitle !== null) pageTitle.innerHTML = title;
  }

  renderMovies(movieList: Movie[]) {
    this.#insertMovieList(movieList);
  }

  renderSearchedMovies(movieList: Movie[]) {
    this.#$movieItems.replaceChildren();
    this.#insertMovieList(movieList);
  }

  #insertMovieList(movieList: Movie[]) {
    if (movieList.length === 0) {
      this.#$movieItems?.insertAdjacentHTML(
        'beforeend',
        `<img src="./assets/empty.png" width="1200px"/>`,
      );
    }
    movieList.map((movie: Movie) => {
      const { title, poster_path, vote_average } = movie;
      this.#$movieItems?.insertAdjacentHTML(
        'beforeend',
        `<movie-item title=${`"${title}"`} poster=${poster_path} vote=${vote_average}></movie-item>`,
      );
    });
  }
}
