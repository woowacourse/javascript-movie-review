import MovieList from './components/MovieList';
import Header from './components/Header';
import MovieFetcher from './domain/MovieFetcher';
import { POPULAR_LIST_NAME, SEARCH_LIST_NAME_SUFFIX } from './constants/listNames';

class App {
  readonly node: HTMLElement;
  private children;
  private movieFetcher;

  constructor() {
    this.node = document.querySelector('#app')!;

    this.children = {
      header: new Header(),
      movieList: new MovieList(),
    };

    this.movieFetcher = new MovieFetcher();

    this.composeNode().addEvents().#renderMovies();
  }

  async #renderMovies() {
    try {
      this.children.movieList.showSkeleton();
      const movieDetails = await this.movieFetcher.fetchMovies();
      this.children.movieList.updateMovieList(movieDetails, this.movieFetcher.isLastPage());
    } catch (error) {
      this.children.movieList.hideSkeleton();

      if (!(error instanceof Error)) return;

      this.children.movieList.showMessage(error.message);
    }
  }

  composeNode(): this {
    this.node.appendChild(this.children.header.node);
    this.node.appendChild(this.children.movieList.node);

    return this;
  }

  searchMovies(keyword: string) {
    this.children.movieList.cleanMovieList();
    this.movieFetcher.setSearchSettings(keyword);
    this.#renderMovies();
  }

  #handleClickLogo() {
    this.children.movieList.cleanMovieList().setListName(POPULAR_LIST_NAME);
    this.movieFetcher.setPopularSettings();
    this.#renderMovies();
  }

  #handleSubmitSearch({ detail }: any) {
    this.children.movieList.cleanMovieList().setListName(`${detail.keyword} ${SEARCH_LIST_NAME_SUFFIX}`);
    this.movieFetcher.setSearchSettings(detail.keyword);
    this.#renderMovies();
  }

  addEvents() {
    document.addEventListener('submit-search', this.#handleSubmitSearch.bind(this));
    document.addEventListener('click-more-button', this.#renderMovies.bind(this));
    document.addEventListener('click-logo', this.#handleClickLogo.bind(this));

    return this;
  }
}

export default App;
