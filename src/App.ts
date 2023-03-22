import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';
import errorItem from './components/errorItem';
import handleError from './handleError';
import MovieListAndButtonContainer from './components/MovieListAndButtonContainer';
import { MOVIE_LIST_TITLE, REQUEST_MOVIES, UPDATE_TYPE } from './constants/constants';

class App {
  private header = new Header();
  private movieList = new MovieList();
  private movieFetcher = new MovieFetcher();
  private loadMoreButton = new LoadMoreButton();
  private movieListAndButtonContainer = new MovieListAndButtonContainer();
  private requestListType = REQUEST_MOVIES.POPULARITY;
  private searchKeyword = '';

  constructor() {
    this.renderInitialItems();
    this.bindEventHandlers();
  }

  renderInitialItems() {
    this.header.render();

    this.movieListAndButtonContainer.renderMovieListTitle(
      this.movieList.getListTitleTemplate(MOVIE_LIST_TITLE.POPULARITY),
    );
    this.fetchAndUpdateMovieList(REQUEST_MOVIES.POPULARITY, UPDATE_TYPE.OVERWRITE);
    this.movieListAndButtonContainer.renderLoadMoreButton(this.loadMoreButton.getTemplate());
  }

  bindEventHandlers() {
    this.header.addSubmitEventHandler(this.onSubmitSearchForm);
    this.loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
  }

  async fetchAndUpdateMovieList(requestListType: string, updateType: string, keyword: string = '') {
    if (updateType === UPDATE_TYPE.OVERWRITE) this.movieFetcher.resetPage();
    if (updateType === UPDATE_TYPE.APPEND) this.movieFetcher.increasePage();

    this.movieList.renderSkeletonItems();

    const { result, fetchStatus, movieList, isLastPage } =
      requestListType === REQUEST_MOVIES.POPULARITY
        ? await this.movieFetcher.getMovieFetchResult()
        : await this.movieFetcher.getMovieFetchResult(keyword);

    this.movieList.removeSkeletonItems();

    if (handleError(result, fetchStatus)) return;

    if (!movieList) return;

    if (requestListType === REQUEST_MOVIES.SEARCH) {
      this.movieList.setTitle(MOVIE_LIST_TITLE.SEARCH(keyword));
      this.requestListType = requestListType;
    }

    if (isLastPage) this.loadMoreButton.disable();

    if (isLastPage && updateType === UPDATE_TYPE.OVERWRITE) {
      this.movieList.renderNoResult(errorItem(result));
      return;
    }

    updateType === UPDATE_TYPE.OVERWRITE
      ? this.movieList.renderContents(movieList)
      : this.movieList.renderNextContents(movieList);

    if (!isLastPage) this.loadMoreButton.enable();
  }

  onSubmitSearchForm = (keyword: string) => {
    this.searchKeyword = keyword;
    this.fetchAndUpdateMovieList(REQUEST_MOVIES.SEARCH, UPDATE_TYPE.OVERWRITE, this.searchKeyword);
  };

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList(this.requestListType, UPDATE_TYPE.APPEND, this.searchKeyword);
  };
}

export default App;
