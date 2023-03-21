import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';
import errorItem from './components/errorItem';
import handleError from './handleError';
import { REQUEST_MOVIES, UPDATE_TYPE } from './constants/constants';

class App {
  #header = new Header();
  #movieList = new MovieList();
  #movieFetcher = new MovieFetcher();
  #loadMoreButton = new LoadMoreButton();
  #requestListType = REQUEST_MOVIES.POPULARITY;
  #searchKeyword = '';

  constructor() {
    this.#header.render();
    this.#movieList.renderListTitle('Popular movies');
    this.fetchAndUpdateMovieList(REQUEST_MOVIES.POPULARITY, UPDATE_TYPE.OVERWRITE);
    this.#loadMoreButton.render('Load More');

    this.#loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
    this.#header.addSubmitEventHandler(this.onSubmitSearchForm);
  }

  async fetchAndUpdateMovieList(requestListType: string, updateType: string, keyword: string = '') {
    if (updateType === UPDATE_TYPE.OVERWRITE) this.#movieFetcher.resetPage();
    if (updateType === UPDATE_TYPE.APPEND) this.#movieFetcher.increasePage();

    this.#movieList.renderSkeletonItems();

    const { result, fetchStatus, movieList, isLastPage } =
      requestListType === REQUEST_MOVIES.POPULARITY
        ? await this.#movieFetcher.getMovieFetchResult()
        : await this.#movieFetcher.getMovieFetchResult(keyword);

    this.#movieList.removeSkeletonItems();

    if (handleError(result, fetchStatus)) return;

    if (!movieList) return;

    if (requestListType === REQUEST_MOVIES.SEARCH) {
      this.#movieList.setTitle(`Search Results of "${keyword}"`);
      this.#requestListType = requestListType;
    }

    if (isLastPage) {
      this.#loadMoreButton.disable();
    }

    if (isLastPage && updateType === UPDATE_TYPE.OVERWRITE) {
      this.#movieList.renderNoResult(errorItem(result));
      return;
    }

    updateType === UPDATE_TYPE.OVERWRITE
      ? this.#movieList.renderContents(movieList)
      : this.#movieList.renderNextContents(movieList);

    if (!isLastPage) this.#loadMoreButton.enable();
  }

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList(this.#requestListType, UPDATE_TYPE.APPEND, this.#searchKeyword);
  };

  onSubmitSearchForm = (keyword: string) => {
    this.#searchKeyword = keyword;
    this.fetchAndUpdateMovieList(REQUEST_MOVIES.SEARCH, UPDATE_TYPE.OVERWRITE, this.#searchKeyword);
  };
}

export default App;
