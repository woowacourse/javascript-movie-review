import './index.css';
import template from './index.html';
import { Movie } from '../../types';
import { $ } from '../../utils/dom';

export class MovieList extends HTMLElement {
  $movieItems: HTMLElement;
  movieList: readonly Movie[];

  constructor() {
    super();
    this.innerHTML = template;
    this.movieList = [];
    this.$movieItems = $<HTMLUListElement>('.item-list');
  }

  initMovieList() {
    this.movieList = [];
  }

  setIntersection(handler: CallableFunction) {
    const target = $<HTMLUListElement>('ul', this).lastElementChild;
    handler(target);
  }

  setTitle(title: string) {
    $<HTMLHeadingElement>('.title', this).innerText = title;
  }

  renderMovies(movies: readonly Movie[]) {
    this.movieList = this.movieList.concat(movies);
    this.insertMovieList();
  }

  insertMovieList() {
    if (this.movieList.length === 0) {
      this.createEmptyTemplate();
    }
    this.movieList.map((movie: Movie) => this.createMovieItemTemplate(movie));
  }

  createEmptyTemplate() {
    if (window.innerWidth < 900) {
      this.$movieItems.insertAdjacentHTML(
        'beforeend',
        `<img class="empty" src="./assets/mobile_empty.jpeg"/>`,
      );
      return;
    }
    this.$movieItems.insertAdjacentHTML(
      'beforeend',
      `<img class="empty"  src="./assets/empty.png" />`,
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
      const id = Number(target.getAttribute('id'));
      handler(id);
    });
  }
}
