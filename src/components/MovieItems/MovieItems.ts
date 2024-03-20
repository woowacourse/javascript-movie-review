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

  private template: HTMLElement;

  private searchQuery?: string;

  constructor() {
    this.template = this.createFallback();
    this.currentPage = 0;
    this.isLast = false;
    this.createElements();
    this.showMore();
  }

  createFallback() {
    const main = document.createElement('main');
    main.classList.add('fall-back');
    main.textContent = '영화가 없어요';
    return main;
  }

  // 초기화 ctor -> createEl, getPopular(1),createMovieItem
  // showmorehandle -> getPopuilar(2), reateMovieItem;

  // 검색 -> event로 받든 어쨌든 받아
  // resetItems()
  // getMatched();

  getElement() {
    return this.template;
  }

  createElements() {
    const main = document.createElement('main');
    main.classList.add('item-view');
    const h2 = document.createElement('h2');
    h2.textContent = '지금 인기 있는 영화';
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    main.appendChild(h2);
    main.appendChild(ul);

    const button = Button.createElements({
      className: ['btn', 'primary', 'full-width'],
      text: '더 보기',
      onClick: this.showMore.bind(this),
    });
    main.appendChild(button);

    this.template = main;
  }

  async getPopularMovies() {
    const movies = await PopularMovies.list({ page: this.currentPage });
    this.checkLastPage(movies.total_pages);
    return movies.results;
  }

  async getMatchedMovies(query: string) {
    const movies = await MatchedMovies.list({ page: this.currentPage, query });
    this.checkLastPage(movies.total_pages);
    return movies.results;
  }

  checkLastPage(totalPage: number) {
    if (this.currentPage >= totalPage) {
      this.isLast = true;
    }
  }

  changeShowMoreButton() {
    const button = this.template.querySelector('button');
    if (!(button instanceof HTMLButtonElement)) return;
    button.disabled = this.isLast;
    button.textContent = this.isLast ? '더이상 불러올 목록이 없어요. :(' : '더 보기';
  }

  resetMovieItems(query?: string) {
    this.searchQuery = query;
    const h2 = this.template?.querySelector('h2');
    if (!(h2 instanceof HTMLElement)) return;
    h2.textContent = `"${query}"검색 결과` ?? '지금 인기있는 영화';
    this.removeMovieItems();
  }

  removeMovieItems() {
    const ul = this.template?.querySelector('ul');
    if (!(ul instanceof HTMLElement)) return;
    ul.innerHTML = '';
    this.currentPage = 0;
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
    this.changeShowMoreButton();
  }

  showMore() {
    this.currentPage += 1;
    if (this.searchQuery === undefined) {
      this.getPopularMovies().then((movies) => this.createMovieItem(movies));
    } else {
      this.getMatchedMovies(this.searchQuery).then((movies) => this.createMovieItem(movies));
    }
  }
}

export default MovieItems;
