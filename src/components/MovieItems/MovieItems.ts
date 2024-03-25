import './style.css';

import PopularMovies from '../../api/PopularMovies';
import MovieItem from '../MovieItem/MovieItem';
import MatchedMovies from '../../api/MatchedMovies';
import Fallback from '../Fallback/Fallback';
import Skeleton from '../Skeleton/Skeleton';
import MovieInfo, { IMovieInfo } from '../../domainObject/MovieInfo';
import MoreSpace from '../MoreSpace/MoreSpace';

class MovieItems {
  private currentPage: number;

  private isLast: boolean;

  private template: HTMLElement;

  private fallback: Fallback;

  private searchQuery?: string;

  private observer: IntersectionObserver;

  constructor() {
    this.fallback = new Fallback();
    this.template = this.createElements();
    this.observer = this.setObserver();
    this.observeMoreSpace();

    this.currentPage = 0;
    this.isLast = false;
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
    // this.createMoreButton(main);
    this.createMoreSpace(main);
    return main;
  }

  private createMoreSpace(main: HTMLElement) {
    const moreSpace = new MoreSpace();
    main.appendChild(moreSpace.element);
  }

  private createH2Element(main: HTMLElement) {
    const h2 = document.createElement('h2');
    h2.classList.add('text-title');
    h2.textContent = '지금 인기있는 영화';
    main.appendChild(h2);
  }

  private createUlElement(main: HTMLElement) {
    const ul = document.createElement('ul');
    ul.classList.add('item-list');
    main.appendChild(ul);
  }

  // private createMoreButton(main: HTMLElement) {
  //   const button = new Button({
  //     className: ['btn', 'primary', 'full-width'],
  //     text: '더 보기',
  //     onClick: debounce({ callback: this.showMore.bind(this), wait: 500 }),
  //   });
  //   main.appendChild(button.element);
  // }

  private async getPopularMovies() {
    const movies = await PopularMovies.list({ page: this.currentPage });
    this.checkLastPage(movies.total_pages);
    return movies.results.map((movie) => MovieInfo.get(movie));
  }

  private async getMatchedMovies(query: string) {
    const movies = await MatchedMovies.list({ page: this.currentPage, query });
    this.checkLastPage(movies.total_pages);
    return movies.results.map((movie) => MovieInfo.get(movie));
  }

  private checkLastPage(totalPage: number) {
    this.isLast = this.currentPage >= totalPage;
  }

  private changeShowMoreButton() {
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
    this.resetPage();
    this.observeMoreSpace();
  }

  private removeMovieItems() {
    const ul = this.template?.querySelector('ul');
    if (!(ul instanceof HTMLElement)) return;
    ul.innerHTML = '';
  }

  private resetPage() {
    this.currentPage = 0;
    this.isLast = false;
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
    this.currentPage += 1;
    const skeletonItems = this.createSkeletonMovieItem();
    if (this.searchQuery) {
      this.getMoreMatchedMovies(skeletonItems);
    } else {
      this.getMorePopularMovies(skeletonItems);
    }
  }

  private setObserver() {
    const observer = new IntersectionObserver(this.observerCallback.bind(this), { threshold: 0.5 });
    return observer;
  }

  private observerCallback(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.unObservedMoreSpace();
        this.showMore();
        this.afterIsIntersecting();
      }
    });
  }

  private afterIsIntersecting() {
    const fallback = this.template.querySelector('.fallback');
    if (fallback === null) {
      this.observeMoreSpace();
    }
  }

  private observeMoreSpace() {
    const moreSpace = this.template.querySelector('.more-space') as HTMLElement;
    this.observer.observe(moreSpace);
  }

  private unObservedMoreSpace() {
    const moreSpace = this.template.querySelector('.more-space') as HTMLElement;
    this.observer.unobserve(moreSpace);
  }

  private deleteSkeletonAndShowMovies(movies: IMovieInfo[], skeletonItems: Skeleton[]) {
    skeletonItems.forEach((skeleton) => skeleton.removeSkeleton());
    this.createMovieItem(movies);
  }

  private showErrorFallback(error: Error) {
    this.fallback.setFallbackMessage(error.message);
    this.removeMovieItems();
    this.template.querySelector('.item-list')?.appendChild(this.fallback.element);
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
    this.changeShowMoreButton();
  }
}

export default MovieItems;
