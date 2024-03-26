/* eslint-disable camelcase */
import './style.css';

import Button from '../Button/Button';

import { ResponseMovieItem } from '../../types/ResponseMovieItem';
import MovieItem from '../MovieItem/MovieItem';
import { MovieService, PopularMoviesService } from '../../services/MovieService';
import { SETTING } from '../../constants/setting';

class MovieItems {
  moviesService: MovieService;
  private template: HTMLElement;

  constructor() {
    this.template = document.createElement('main');
    this.template.classList.add('item-view');
    this.moviesService = new PopularMoviesService();
    this.createElements();
    this.fetchMovieItems();
  }

  getElement() {
    return this.template;
  }

  createElements() {
    const h2 = document.createElement('h2');
    h2.textContent = '지금 인기 있는 영화';
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    this.template.appendChild(h2);
    this.template.appendChild(ul);

    const button = Button.createElements({
      className: ['btn', 'primary', 'full-width'],
      text: '더 보기',
      onClick: this.fetchMovieItems.bind(this),
    });
    this.template.appendChild(button);
  }

  changeShowMoreButton() {
    const button = this.template.querySelector('button');
    if (!(button instanceof HTMLButtonElement)) return;
    button.disabled = this.moviesService.isLastPage;
    button.textContent = this.moviesService.isLastPage
      ? '더이상 불러올 목록이 없어요. :('
      : '더 보기';
  }

  resetMovieItems() {
    const h2 = this.template?.querySelector('h2');
    if (!(h2 instanceof HTMLHeadingElement)) return;
    h2.textContent = this.moviesService.query
      ? `"${this.moviesService.query}"검색 결과`
      : '지금 인기있는 영화';
    this.removeMovieItems();
  }

  removeMovieItems() {
    const ul = this.template?.querySelector('ul');
    if (!(ul instanceof HTMLUListElement)) return;
    ul.innerHTML = '';
  }

  createSkeletonMovieItem() {
    const fragment = document.createDocumentFragment();
    const skeletonItems = Array.from({ length: SETTING.itemsOnPage }).map(() => {
      const movieItem = new MovieItem();
      fragment.appendChild(movieItem.getElement());
      return movieItem;
    });
    this.template?.querySelector('ul')?.appendChild(fragment);
    return skeletonItems;
  }

  removeSkeletonMovieItem() {
    const skeletons = this.template.querySelectorAll('.li-skeleton');
    skeletons.forEach((skeleton) => {
      skeleton.remove();
    });
  }

  createMovieItem(movies: ResponseMovieItem[], skeletonItems: MovieItem[]) {
    movies.forEach((movie, index) => {
      const { id, poster_path, title, vote_average } = movie;
      skeletonItems[index].insertInfo({ id, poster_path, title, vote_average });
    });
    this.removeSkeletonMovieItem();
    this.changeShowMoreButton();
  }

  fetchMovieItems() {
    const skeletonItems = this.createSkeletonMovieItem();
    this.moviesService
      .fetchMovies()
      .then((movies) => this.createMovieItem(movies, skeletonItems))
      .catch((error) => {
        document.dispatchEvent(new CustomEvent('APIError', { detail: error, bubbles: true }));
      });
  }

  getLastPageItems() {
    if (this.moviesService.isLastPage) {
      return this.moviesService.isLastPage;
    }
  }
}

export default MovieItems;
