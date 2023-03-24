import './index.css';
import template from './index.html';
import { Movie } from '../../types';
import { $ } from '../../utils/dom';

export class MovieList extends HTMLElement {
  $movieItems: HTMLElement;

  constructor() {
    super();
    this.innerHTML = template;
    this.$movieItems = $<HTMLUListElement>('.item-list');
  }

  setTitle(title: string) {
    $<HTMLHeadingElement>('.title', this).innerText = title;
  }

  renderMovies(movieList: readonly Movie[]) {
    this.insertMovieList(movieList);
  }

  renderSearchedMovies(movieList: readonly Movie[]) {
    this.$movieItems.replaceChildren();
    this.insertMovieList(movieList);
  }

  insertMovieList(movieList: readonly Movie[]) {
    if (movieList.length === 0) {
      this.createEmptyTemplate();
    }
    movieList.map((movie: Movie) => this.createMovieItemTemplate(movie));
  }

  createEmptyTemplate() {
    this.$movieItems.insertAdjacentHTML(
      'beforeend',
      `<img src="./assets/empty.png" width="1200px"/>`,
    );
  }

  createMovieItemTemplate(movie: Movie) {
    const { id, title, posterPath, voteAverage } = movie;
    this.$movieItems.insertAdjacentHTML(
      'beforeend',
      `<movie-item title=${`"${title}"`} poster=${posterPath} vote=${voteAverage} id=${id}></movie-item>`,
    );
  }

  addMovieModalHandler(handler: CallableFunction) {
    this.addEventListener('click', (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;
      const target = e.target.closest('movie-item');
      if (!target) return;
      const id = Number(target?.getAttribute('id'));
      handler(id);
    });
  }
}
