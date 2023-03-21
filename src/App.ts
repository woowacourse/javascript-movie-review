import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';
import errorItem from './components/errorItem';
import handleError from './handleError';

class App {
  #header = new Header();
  #movieList = new MovieList();
  #movieFetcher = new MovieFetcher();
  #loadMoreButton = new LoadMoreButton();
  #requestListType = 'popularity';
  #searchKeyword = '';

  constructor() {
    this.#header.render();
    this.#movieList.renderListTitle('Popular movies');
    this.fetchAndUpdateMovieList('popularity', 'overwrite');
    this.#loadMoreButton.render('Load More');

    this.#loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
    this.#header.addSubmitEventHandler(this.onSubmitSearchForm);
  }

  async fetchAndUpdateMovieList(requestListType: string, updateType: string, keyword: string = '') {
    if (updateType === 'overwrite') this.#movieFetcher.resetPage();
    if (updateType === 'append') this.#movieFetcher.increasePage();

    this.#movieList.renderSkeletonItems();

    const { result, fetchStatus, movieList, isLastPage } =
      requestListType === 'popularity'
        ? await this.#movieFetcher.getMovieFetchResult()
        : await this.#movieFetcher.getMovieFetchResult(keyword);

    this.#movieList.removeSkeletonItems();

    if (handleError(result, fetchStatus)) return;

    if (!movieList) return;

    if (requestListType === 'keyword') {
      this.#movieList.setTitle(`Search Results of "${keyword}"`);
      this.#requestListType = 'keyword';
    }

    if (isLastPage) {
      this.#loadMoreButton.disable();
    }

    if (isLastPage && updateType === 'overwrite') {
      this.#movieList.renderNoResult(errorItem(result));
      return;
    }

    updateType === 'overwrite'
      ? this.#movieList.renderContents(movieList)
      : this.#movieList.renderNextContents(movieList);

    if (!isLastPage) this.#loadMoreButton.enable();
  }

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList(this.#requestListType, 'append', this.#searchKeyword);
  };

  onSubmitSearchForm = (keyword: string) => {
    this.#searchKeyword = keyword;
    this.fetchAndUpdateMovieList('keyword', 'overwrite', this.#searchKeyword);
  };
}

export default App;
