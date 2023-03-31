import { $ } from '../utils/domSelector';
import { CAPTION, MOVIE_LIST_TITLE } from '../constants';
import errorItem from './errorItem';
import MovieList from './MovieList';
import EventBroker from '../EventBroker';
import handleError from '../handleError';
import MovieFetcher from '../domains/MovieFetcher';
import ListEndObserver from './ListEndObserver';

class MovieListContainer {
  private $container = $<HTMLElement>('.item-view');
  private movieList = new MovieList();
  private movieFetcher = new MovieFetcher();
  private $scrollTarget;
  private listEndObserver;
  private isSearchMovieList = false;
  private keyword = '';

  constructor() {
    this.renderMovieListTitle(this.movieList.getListTitleTemplate());
    this.$scrollTarget = $<HTMLParagraphElement>('.scroll-target');
    this.listEndObserver = new ListEndObserver(this.$scrollTarget);
    this.updateMovieList();

    this.addUpdateMovieListEventHandler();
    this.addAppendMovieListEventHandler();
    this.movieList.addClickEventHandler();
  }

  private renderMovieListTitle(listTitleTemplate: string) {
    this.$container.insertAdjacentHTML('beforeend', listTitleTemplate);
  }

  private async updateMovieList(keyword?: string) {
    this.isSearchMovieList = typeof keyword === 'string';
    this.movieFetcher.resetPage();
    this.movieList.renderSkeletonItems();

    const { statusCode, statusMessage, movieList, isLastPage } = this.isSearchMovieList
      ? await this.movieFetcher.fetchMovieList(keyword)
      : await this.movieFetcher.fetchMovieList();

    this.movieList.removeSkeletonItems();

    if (handleError(statusCode, statusMessage)) return;

    this.$scrollTarget.textContent = isLastPage ? CAPTION.LAST_PAGE : '';

    if (this.isSearchMovieList && typeof keyword === 'string') {
      this.keyword = keyword;
      this.movieList.setTitle(MOVIE_LIST_TITLE.SEARCH(keyword));
    }

    if (isLastPage && movieList.length === 0) {
      this.movieList.renderNoResult(errorItem(isLastPage));
      return;
    }

    this.movieList.renderContents(movieList);
  }

  private async appendMovieList() {
    this.movieFetcher.increasePage();
    this.movieList.renderSkeletonItems();

    const { statusCode, statusMessage, movieList, isLastPage } = this.isSearchMovieList
      ? await this.movieFetcher.fetchMovieList(this.keyword)
      : await this.movieFetcher.fetchMovieList();

    this.movieList.removeSkeletonItems();

    if (handleError(statusCode, statusMessage)) return;
    if (this.isSearchMovieList) this.movieList.setTitle(MOVIE_LIST_TITLE.SEARCH(this.keyword));

    this.movieList.renderNextContents(movieList);
    this.$scrollTarget.textContent = isLastPage ? CAPTION.LAST_PAGE : '';
  }

  private addUpdateMovieListEventHandler() {
    EventBroker.addEventListener('updateMovieListEvent', (event) => {
      this.updateMovieList(event.detail.keyword);
    });
  }

  private addAppendMovieListEventHandler() {
    EventBroker.addEventListener('appendMovieListEvent', () => {
      this.appendMovieList();
    });
  }
}

export default MovieListContainer;
