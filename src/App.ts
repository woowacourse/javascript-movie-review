import MovieFetcher from './domains/MovieFetcher';
import MovieList from './components/MovieList';
import LoadMoreButton from './components/LoadMoreButton';

class App {
  #loadMoreButton = new LoadMoreButton();
  #movieList = new MovieList();
  #movieFetcher = new MovieFetcher();

  constructor() {
    this.#movieList.renderListTitle('Popular movies');
    this.fetchAndUpdateMovieList('overwrite');
    this.#loadMoreButton.render('Show More');

    this.#loadMoreButton.addClickEventHandler(this.onClickLoadMoreButton);
  }

  async fetchAndUpdateMovieList(updateType: string) {
    const movieList = await this.#movieFetcher.fetchMovieInfoByPopularity();
    if (!movieList) return;

    updateType === 'overwrite'
      ? this.#movieList.renderContents(movieList)
      : this.#movieList.renderNextContents(movieList);
  }

  onClickLoadMoreButton = () => {
    this.fetchAndUpdateMovieList('append');
  };
}

export default App;
