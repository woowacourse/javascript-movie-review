import { $ } from '../utils/domSelector';
import MovieFetcher from '../domains/MovieFetcher';
import MovieList from './MovieList';
import LoadMoreButton from './LoadMoreButton';
import errorItem from './errorItem';
import handleError from '../handleError';
import EventBroker from '../EventBroker';
import { MOVIE_LIST_TITLE } from '../constants';

class MovieListAndButtonContainer {
  private $container = $<HTMLElement>('.item-view');
  private movieList = new MovieList();
  private movieFetcher = new MovieFetcher();
  private loadMoreButton = new LoadMoreButton();
  private isSearchMovieList = false;
  private searchKeyword = '';

  constructor() {
    this.renderMovieListTitle(this.movieList.getListTitleTemplate());
    this.updateMovieList();
    this.renderLoadMoreButton(this.loadMoreButton.getTemplate());

    this.loadMoreButton.addClickEventHandler();
    this.addUpdateMovieListEventHandler();
    this.addAppendMovieListEventHandler();
  }

  private renderMovieListTitle(listTitleTemplate: string) {
    this.$container.insertAdjacentHTML('beforeend', listTitleTemplate);
  }

  private renderLoadMoreButton(buttonTemplate: string) {
    this.$container.insertAdjacentHTML('beforeend', buttonTemplate);
  }

  private async updateMovieList(keyword?: string) {
    this.isSearchMovieList = typeof keyword === 'string' ? true : false;
    this.movieFetcher.resetPage();
    this.movieList.renderSkeletonItems();

    const { statusCode, statusMessage, movieList, isLastPage } = this.isSearchMovieList
      ? await this.movieFetcher.fetchMovieList(keyword)
      : await this.movieFetcher.fetchMovieList();

    this.movieList.removeSkeletonItems();

    if (handleError(statusCode, statusMessage)) return;
    if (isLastPage) this.loadMoreButton.disable();
    if (isLastPage && movieList.length === 0) {
      this.movieList.renderNoResult(errorItem(isLastPage));
      return;
    }

    this.movieList.renderContents(movieList);
    if (this.isSearchMovieList && keyword) this.searchKeyword = keyword;
    if (!isLastPage) this.loadMoreButton.enable();
  }

  private async appendMovieList() {
    this.movieFetcher.increasePage();
    this.movieList.renderSkeletonItems();

    const { statusCode, statusMessage, movieList, isLastPage } = this.isSearchMovieList
      ? await this.movieFetcher.fetchMovieList(this.searchKeyword)
      : await this.movieFetcher.fetchMovieList();

    this.movieList.removeSkeletonItems();

    if (handleError(statusCode, statusMessage)) return;
    if (this.isSearchMovieList) {
      this.movieList.setTitle(MOVIE_LIST_TITLE.SEARCH(this.searchKeyword));
    }

    this.movieList.renderNextContents(movieList);

    if (isLastPage) this.loadMoreButton.disable();
    if (!isLastPage) this.loadMoreButton.enable();
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

export default MovieListAndButtonContainer;
