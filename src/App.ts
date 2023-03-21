import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';
import errorItem from './components/errorItem';
import handleError from './handleError';
import { REQUEST_MOVIES, UPDATE_TYPE } from './constants/constants';
import MovieListAndButtonContainer from './components/MovieListAndButtonContainer';

class App {
  private header = new Header();
  private movieList = new MovieList();
  private movieFetcher = new MovieFetcher();
  private loadMoreButton = new LoadMoreButton();
  private movieListAndButtonContainer = new MovieListAndButtonContainer();
  private requestListType = REQUEST_MOVIES.POPULARITY;
  private searchKeyword = '';

  constructor() {
    this.header.render();

    this.movieListAndButtonContainer.renderMovieListTitle(
      this.movieList.getListTitleTemplate('Popular movies'),
    );
    this.fetchAndUpdateMovieList(REQUEST_MOVIES.POPULARITY, UPDATE_TYPE.OVERWRITE);
    this.movieListAndButtonContainer.renderLoadMoreButton(this.loadMoreButton.getTemplate());

    this.loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
    this.header.addSubmitEventHandler(this.onSubmitSearchForm);
  }

  async fetchAndUpdateMovieList(requestListType: string, updateType: string, keyword: string = '') {
    if (updateType === UPDATE_TYPE.OVERWRITE) this.movieFetcher.resetPage();
    if (updateType === UPDATE_TYPE.APPEND) this.movieFetcher.increasePage();

    const { result, fetchStatus, movieList, isLastPage } =
      requestListType === REQUEST_MOVIES.POPULARITY
        ? await this.movieFetcher.getMovieFetchResult()
        : await this.movieFetcher.getMovieFetchResult(keyword);

    if (handleError(result, fetchStatus)) return;

    if (!movieList) return;

    if (requestListType === REQUEST_MOVIES.SEARCH) {
      this.movieList.setTitle(`Search Results of "${keyword}"`);
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

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList(this.requestListType, UPDATE_TYPE.APPEND, this.searchKeyword);
  };

  onSubmitSearchForm = (keyword: string) => {
    this.searchKeyword = keyword;
    this.fetchAndUpdateMovieList(REQUEST_MOVIES.SEARCH, UPDATE_TYPE.OVERWRITE, this.searchKeyword);
  };
}

export default App;
