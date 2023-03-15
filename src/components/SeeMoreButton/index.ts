import template from './index.html';
import { MovieList } from '../MovieList';

export class SeeMoreButton extends HTMLElement {
  movieList: MovieList;
  page: number;

  constructor() {
    super();
    this.movieList = new MovieList();
    this.page = 1;
  }

  connectedCallback() {
    this.innerHTML = template;
    this.addEventListener('click', () => {
      this.movieList.getPopularMovieList(++this.page);
    });
  }
}
