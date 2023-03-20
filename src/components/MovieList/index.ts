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

  renderMovies(movieList: Movie[]) {
    this.insertMovieList(movieList);
  }

  renderSearchedMovies(movieList: Movie[]) {
    this.$movieItems.replaceChildren();
    this.insertMovieList(movieList);
  }

  insertMovieList(movieList: Movie[]) {
    if (movieList.length === 0) {
      this.$movieItems.insertAdjacentHTML(
        'beforeend',
        `<img src="./assets/empty.png" width="1200px"/>`,
      );
    }
    movieList.map((movie: Movie) => {
      const { title, posterPath, voteAverage } = movie;
      this.$movieItems.insertAdjacentHTML(
        'beforeend',
        `<movie-item title=${`"${title}"`} poster=${posterPath} vote=${voteAverage}></movie-item>`,
      );
    });
  }
}
