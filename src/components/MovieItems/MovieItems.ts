import './style.css';

import PopularMovies from '../../api/PopularMovies';
import MovieItem from '../MovieItem/MovieItem';
import MatchedMovies from '../../api/MatchedMovies';
import Fallback from '../Fallback/Fallback';
import Skeleton from '../Skeleton/Skeleton';
import MovieInfo, { IMovieInfo } from '../../domainObject/MovieInfo';
import MoreSpace from '../MoreSpace/MoreSpace';
import Pagination from '../Pagination/Pagination';

class MovieItems {
  private template: HTMLElement;

  private fallback: Fallback;

  private searchQuery?: string;

  private pagination: Pagination;

  private moreSpace: MoreSpace;

  constructor() {
    this.fallback = new Fallback();
    this.moreSpace = new MoreSpace(this.showMore.bind(this));
    this.template = this.createElements();

    this.pagination = new Pagination();
    this.showMore();
  }

  get element() {
    return this.template;
  }

  private createElements() {
    const main = document.createElement('main');
    main.classList.add('item-view');

    this.createH2Element(main);
    this.createUlElement(main);
    this.createMoreSpace(main);
    return main;
  }

  private createMoreSpace(main: HTMLElement) {
    main.appendChild(this.moreSpace.element);
  }

  private createH2Element(main: HTMLElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('text-title', 'movie-items-title');
    h2.textContent = '지금 인기있는 영화';
    main.appendChild(h2);
  }

  private createUlElement(main: HTMLElement) {
    const ul = document.createElement('ul');
    ul.classList.add('item-list');
    main.appendChild(ul);
  }

  private async getPopularMovies() {
    const movies = await PopularMovies.list({ page: this.pagination.curPage });
    this.pagination.checkLastPage(movies.total_pages);
    return movies.results.map((movie) => MovieInfo.get(movie));
  }

  private async getMatchedMovies(query: string) {
    const movies = await MatchedMovies.list({ page: this.pagination.curPage, query });
    this.pagination.checkLastPage(movies.total_pages);
    return movies.results.map((movie) => MovieInfo.get(movie));
  }

  resetMovieItems(query?: string) {
    this.searchQuery = query;
    const h2 = this.template?.querySelector('h2');
    if (!(h2 instanceof HTMLElement)) return;
    h2.textContent = query ? `"${query}"검색 결과` : '지금 인기있는 영화';
    this.removeMovieItems();
    this.pagination.resetPage();
    this.moreSpace.observeMoreSpace();
  }

  private removeMovieItems() {
    const ul = this.template?.querySelector('ul');
    if (!(ul instanceof HTMLElement)) return;
    ul.innerHTML = '';
  }

  private createSkeletonMovieItem() {
    const fragment = document.createDocumentFragment();
    const skeletonItems = Array.from({ length: 20 }).map(() => {
      const skeleton = new Skeleton();
      fragment.appendChild(skeleton.element);
      return skeleton;
    });
    this.template?.querySelector('ul')?.appendChild(fragment);
    return skeletonItems;
  }

  showMore() {
    this.pagination.goNextPage();
    const skeletonItems = this.createSkeletonMovieItem();
    if (this.searchQuery) {
      this.getMoreMatchedMovies(skeletonItems);
    } else {
      this.getMorePopularMovies(skeletonItems);
    }
  }

  private deleteSkeletonAndShowMovies(movies: IMovieInfo[], skeletonItems: Skeleton[]) {
    skeletonItems.forEach((skeleton) => skeleton.removeSkeleton());
    this.createMovieItem(movies);
  }

  private showErrorFallback(error: Error) {
    this.fallback.setFallbackMessage(error.message);
    if (!this.isExistMovies()) {
      this.removeMovieItems();
      this.template.querySelector('.item-list')?.appendChild(this.fallback.element);
    } else {
      this.removeSkeleton();
      this.moreSpace.unObservedMoreSpace();
    }
  }

  private removeSkeleton() {
    const skeletons = this.template.querySelectorAll('.item-skeleton');
    Array.from(skeletons).forEach((skeleton) => skeleton.remove());
  }

  private getMoreMatchedMovies(skeletonItems: Skeleton[]) {
    this.getMatchedMovies(this.searchQuery ?? '')
      .then((movies) => this.deleteSkeletonAndShowMovies(movies, skeletonItems))
      .catch(this.showErrorFallback.bind(this));
  }

  private getMorePopularMovies(skeletonItems: Skeleton[]) {
    this.getPopularMovies()
      .then((movies) => this.deleteSkeletonAndShowMovies(movies, skeletonItems))
      .catch(this.showErrorFallback);
  }

  private createMovieItem(movies: IMovieInfo[]) {
    const fragment = document.createDocumentFragment();
    movies.forEach((movie) => {
      const { id, poster, title, voteAverage } = movie;
      fragment.appendChild(new MovieItem({ id, poster, title, voteAverage }).element);
    });

    this.template?.querySelector('ul')?.appendChild(fragment);
  }

  private isExistMovies() {
    const movieItems = this.template.querySelector('.item-card');
    return movieItems !== null;
  }
}

export default MovieItems;
