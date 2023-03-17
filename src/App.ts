import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieFetcher from './domains/MovieFetcher';
import LoadMoreButton from './components/LoadMoreButton';

class App {
  #header = new Header();
  #movieList = new MovieList();
  #movieFetcher = new MovieFetcher();
  #loadMoreButton = new LoadMoreButton();
  #searchKeyword = '';

  constructor() {
    this.#header.render();
    this.#movieList.renderListTitle('Popular movies');
    this.fetchAndUpdateMovieList('overwrite');
    this.#loadMoreButton.render('Load More');

    this.#loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
    this.#header.addClickEventHandler(this.onClickSearchButton);
  }

  async fetchAndUpdateMovieList(updateMode: string, keyword: string = '') {
    if (updateMode === 'overwrite') this.#movieFetcher.resetPage();

    this.#movieList.renderSkeletonItems();

    const { result, status, movies } = await this.#movieFetcher.fetchMovies(keyword);

    this.#movieList.removeSkeletonItems();

    // 임시 오류 메시지
    if (result !== 'OK') {
      console.log('Error!', status, movies);
    }

    if (!movies) return;

    updateMode === 'overwrite'
      ? this.#movieList.renderContents(movies)
      : this.#movieList.renderNextContents(movies);
  }

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList('append', this.#searchKeyword);
  };

  onClickSearchButton = (keyword: string) => {
    this.#movieList.setTitle(`Search Results of "${keyword}"`);
    this.#movieFetcher.setRequestMode('search');
    this.fetchAndUpdateMovieList('overwrite', keyword);
  };
}

export default App;
