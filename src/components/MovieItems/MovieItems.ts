/* eslint-disable camelcase */
import './style.css';

import Button from '../Button/Button';

import PopularMovies from '../../domain/PopularMovies';
import { ResponseMovieItem } from '../../types/ResponseMovieItem';
import MovieItem from '../MovieItem/MovieItem';
import MatchedMovies from '../../domain/MatchedMovies';

class MovieItems {
  private currentPage: number;

  private isLast: boolean;

  private template: HTMLElement | undefined;

  constructor() {
    this.currentPage = 1;
    this.isLast = false;
  }

  // 검색 -> event로 받든 어쨌든 받아
  // resetItems()
  // getMatched();

  createElements() {
    const main = document.createElement('main');
    main.classList.add('item-view');
    const h2 = document.createElement('h2');
    h2.textContent = '지금 인기 있는 영화';
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    h2.appendChild(ul);
    main.appendChild(h2);

    const button = Button.createElements({
      className: ['btn', 'primary', 'full-width'],
      text: '더 보기',
      onClick: this.handleOnClick,
    });
    main.appendChild(button);

    this.template = main;
    return main;
  }

  handleOnClick() {
    console.log('!');
  }

  async getPopularMovies() {
    const movies = await PopularMovies.list({ page: this.currentPage });
    this.currentPage = movies.page;

    this.checkLastPage(movies.total_pages);
    return movies.results;
  }

  async getMatchedMovies(query: string) {
    const movies = await MatchedMovies.list({ page: this.currentPage, query });
    this.currentPage = movies.page;

    this.checkLastPage(movies.total_pages);
    return movies;
  }

  checkLastPage(totalPage: number) {
    if (this.currentPage >= totalPage) {
      // 더보기 없애버림
      this.isLast = true;
    }
  }

  removeMovieItems(query?: string) {
    const h2 = this.template?.querySelector('h2');
    if (!(h2 instanceof HTMLElement)) return;
    h2.textContent = query ?? '지금 인기있는 영화';
    const ul = this.template?.querySelector('ul');
    if (!(ul instanceof HTMLElement)) return;
    ul.innerHTML = '';
    this.currentPage = 1;
    this.isLast = false;
  }

  createMovieItem(movies: ResponseMovieItem[]) {
    const fragment = document.createDocumentFragment();
    movies.forEach((movie) => {
      const { backdrop_path, poster_path, title, vote_average } = movie;
      const item = MovieItem.createElements({ backdrop_path, poster_path, title, vote_average });
      fragment.appendChild(item);
    });
    this.template?.querySelector('ul')?.appendChild(fragment);
  }

  rendetar() {
    return this.template;
  }
}

export default MovieItems;
