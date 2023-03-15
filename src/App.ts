import MovieFetcher from './domains/MovieFetcher';
import MovieList from './components/MovieList';
import LoadMoreButton from './components/LoadMoreButton';

class App {
  #loadMoreButton = new LoadMoreButton();
  #movieList = new MovieList();
  #movieFetcher = new MovieFetcher();

  constructor() {
    this.#movieList.renderListTitle('Popular movies');
    this.fetchAndUpdateMovieList();
    this.#loadMoreButton.render('Show More');
  }

  async fetchAndUpdateMovieList() {
    const movieList = await this.#movieFetcher.fetchMovieInfoByPopularity();
    if (!movieList) return;

    this.#movieList.renderContents(movieList);
  }
}

export default App;
