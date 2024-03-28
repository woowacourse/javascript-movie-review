/* eslint-disable camelcase */
import './style.css';

import Button from '../Button/Button';
import MovieItem from '../MovieItem/MovieItem';

import { MovieService, PopularMoviesService } from '../../services/MovieService';

import { ResponseMovieItem } from '../../types/ResponseMovieItem';

import SETTING from '../../constants/setting';

class MovieItems {
  moviesService: MovieService;
  intersectionObserver: IntersectionObserver;
  private template: HTMLElement;

  constructor() {
    this.moviesService = new PopularMoviesService();
    this.intersectionObserver = new IntersectionObserver(this.observerCallback.bind(this), {
      threshold: 0.5,
    });
    this.template = this.createTemplate();
    this.createTemplate();
    this.resetMovieItems();
  }

  observerCallback(
    entries: IntersectionObserverEntry[],
    intersectionObserver: IntersectionObserver,
  ) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        intersectionObserver.unobserve(entry.target);
        this.fetchMovieItems();
      }
    });
  }

  observeTargetItem(intersectionObserver: IntersectionObserver, items: NodeListOf<Element>) {
    const targetItem = items[items.length - 10];
    intersectionObserver.observe(targetItem);
  }

  createTemplate() {
    const div = document.createElement('main');
    div.classList.add('item-view');

    const h2 = document.createElement('h2');
    h2.textContent = '지금 인기 있는 영화';
    const ul = document.createElement('ul');
    ul.classList.add('item-list');

    div.appendChild(h2);
    div.appendChild(ul);

    const button = Button.createTemplate({
      className: ['btn', 'secondary', 'full-width'],
      text: '목록을 불러오고 있어요',
      onClick: this.fetchMovieItems.bind(this),
    });
    div.appendChild(button);

    return div;
  }

  changeShowMoreButton() {
    const button = this.template.querySelector('button');
    if (!(button instanceof HTMLButtonElement)) return;
    button.disabled = this.moviesService.isLastPage;
    button.textContent = this.moviesService.isLastPage
      ? '더이상 불러올 목록이 없어요. :('
      : '목록을 불러오고 있어요';
  }

  resetMovieItems() {
    const h2 = this.template?.querySelector('h2');
    if (!(h2 instanceof HTMLHeadingElement)) return;
    h2.textContent = this.moviesService.query
      ? `"${this.moviesService.query}"검색 결과`
      : '지금 인기있는 영화';
    this.removeMovieItems();
    this.fetchMovieItems();
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
      const { id, title, genre_ids, poster_path, backdrop_path, overview, vote_average } = movie;
      skeletonItems[index].insertInfo({
        id,
        title,
        genre_ids,
        poster_path,
        backdrop_path,
        overview,
        vote_average,
      });
    });
    this.removeSkeletonMovieItem();
    this.changeShowMoreButton();
  }

  fetchMovieItems() {
    const skeletonItems = this.createSkeletonMovieItem();
    this.moviesService
      .fetchMovies()
      .then((movies) => {
        this.createMovieItem(movies, skeletonItems);
        if (!this.moviesService.isLastPage && this.template.querySelectorAll('.item-card').length) {
          this.observeTargetItem(
            this.intersectionObserver,
            this.template.querySelectorAll('.item-card'),
          );
        }
      })
      .catch((error) => {
        document.dispatchEvent(new CustomEvent('APIError', { detail: error, bubbles: true }));
      });
  }

  getLastPageItems() {
    if (this.moviesService.isLastPage) {
      return this.moviesService.isLastPage;
    }
  }

  getElement() {
    return this.template;
  }
}

export default MovieItems;
