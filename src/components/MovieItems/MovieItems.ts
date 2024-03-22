/* eslint-disable camelcase */
import './style.css';

import Button from '../Button/Button';

import PopularMovies from '../../domain/PopularMovies';
import { ResponseMovieItem } from '../../types/ResponseMovieItem';
import MovieItem from '../MovieItem/MovieItem';
import MatchedMovies from '../../domain/MatchedMovies';
import Fallback from '../Fallback/Fallback';

class MovieItems {
  private currentPage: number;

  private isLast: boolean;

  private template: HTMLElement;

  private fallback: Fallback;

  private searchQuery?: string;

  constructor() {
    this.fallback = new Fallback();
    this.template = this.fallback.getElement();
    this.currentPage = 0;
    this.isLast = false;
    this.createElements();
    this.showMore();
  }

  get element() {
    return this.template;
  }

  createElements() {
    const main = document.createElement('main');
    main.classList.add('item-view');

    this.createH2Element(main);
    this.createUlElement(main);
    this.createMoreButton(main);

    this.template = main;
  }

  createH2Element(main: HTMLElement) {
    const h2 = document.createElement('h2');
    h2.textContent = '지금 인기 있는 영화';
    main.appendChild(h2);
  }

  createUlElement(main: HTMLElement) {
    const ul = document.createElement('ul');
    ul.classList.add('item-list');
    main.appendChild(ul);
  }

  createMoreButton(main: HTMLElement) {
    const button = new Button({
      className: ['btn', 'primary', 'full-width'],
      text: '더 보기',
      onClick: this.showMore.bind(this),
    });
    main.appendChild(button.element);
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
    h2.textContent = query ? `"${query}"검색 결과` : '지금 인기있는 영화';
    this.removeMovieItems();
  }

  removeMovieItems() {
    const ul = this.template?.querySelector('ul');
    if (!(ul instanceof HTMLElement)) return;
    ul.innerHTML = '';
    this.currentPage = 0;
    this.isLast = false;
  }

  createSkeletonMovieItem() {
    const fragment = document.createDocumentFragment();
    const skeletonItems = Array.from({ length: 20 }).map(() => {
      const movieItem = new MovieItem();
      fragment.appendChild(movieItem.getElement());
      return movieItem;
    });
    this.template?.querySelector('ul')?.appendChild(fragment);
    return skeletonItems;
  }

  createMovieItem(movies: ResponseMovieItem[], skeletonItems: MovieItem[]) {
    movies.forEach((movie, index) => {
      const { poster_path, title, vote_average } = movie;
      skeletonItems[index].insertInfo({ poster_path, title, vote_average });
    });
    this.removeSkeletonMovieItem();
    this.changeShowMoreButton();
  }

  removeSkeletonMovieItem() {
    const skeletons = this.template.querySelectorAll('.li-skeleton');
    skeletons.forEach((skeleton) => {
      skeleton.remove();
    });
  }

  showMore() {
    this.currentPage += 1;
    const skeletonItems = this.createSkeletonMovieItem();
    if (this.searchQuery) {
      this.getMoreMatchedMovies(skeletonItems);
    } else {
      this.getMorePopularMovies(skeletonItems);
    }
  }

  private getMorePopularMovies(skeletonItems: MovieItem[]) {
    this.getPopularMovies()
      .then((movies) => this.createMovieItem(movies, skeletonItems))
      .catch((error) => {
        this.fallback.setFallbackMessage(error.message);
        this.template.innerHTML = '';
        this.template.appendChild(this.fallback.getElement());
      });
  }

  private getMoreMatchedMovies(skeletonItems: MovieItem[]) {
    this.getMatchedMovies(this.searchQuery ?? '').then((movies) =>
      this.createMovieItem(movies, skeletonItems),
    );
  }
}

export default MovieItems;
