import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';

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
    this.#loadMoreButton.render('Show More');

    this.#loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
    this.#header.addClickEventHandler(this.onClickSearchButton);
  }

  async fetchAndUpdateMovieList(requestListType: string, updateType: string, keyword: string = '') {
    if (updateType === 'overwrite') this.#movieFetcher.resetPage();

    const movieList =
      requestListType === 'popularity'
        ? await this.#movieFetcher.fetchMovieInfoByPopularity()
        : await this.#movieFetcher.fetchMovieInfoByKeyword(keyword);
    if (!movieList) return;

    updateType === 'overwrite'
      ? this.#movieList.renderContents(movieList)
      : this.#movieList.renderNextContents(movieList);
  }

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList(this.#requestListType, 'append', this.#searchKeyword);
  };

  onClickSearchButton = (keyword: string) => {
    this.#requestListType = 'keyword';
    this.#searchKeyword = keyword;
    this.fetchAndUpdateMovieList(this.#requestListType, 'overwrite', this.#searchKeyword);
  };
}

export default App;
