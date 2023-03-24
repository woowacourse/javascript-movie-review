import MovieList from './components/MovieList';
import Header from './components/Header';
import MovieFetcher from './domain/fetcher/MovieFetcher';
import { POPULAR_LIST_NAME, SEARCH_LIST_NAME_SUFFIX } from './constants/listNames';
import PopularMovieFetcher from './domain/fetcher/PopularMovieFetcher';
import SearchMovieFetcher from './domain/fetcher/SearchMovieFetcher';

class App {
  readonly node: HTMLElement;
  private children;
  private movieFetcher: MovieFetcher;

  constructor() {
    this.node = document.querySelector('#app')!;

    this.children = {
      header: new Header(),
      movieList: new MovieList(),
    };

    this.movieFetcher = new PopularMovieFetcher();

    this.composeNode().addEvents().#renderMovies();
  }

  async #renderMovies() {
    try {
      this.children.movieList.showSkeleton();
      const movieDetails = await this.movieFetcher.fetchNextMovies();
      const isLastPage = this.movieFetcher.isLastPage();
      this.children.movieList.updateMovieList(movieDetails, isLastPage);
    } catch (error) {
      this.children.movieList.hideSkeleton();

      if (!(error instanceof Error)) return;

      this.children.movieList.showMessage(error.message);
    }
  }

  composeNode(): this {
    this.node.appendChild(this.children.header.node);
    this.node.appendChild(document.createElement('main').appendChild(this.children.movieList.node));
    return this;
  }

  #handleClickLogo() {
    this.movieFetcher = new PopularMovieFetcher();
    this.children.movieList.cleanMovieList().setListName(POPULAR_LIST_NAME);
    this.#renderMovies();
  }

  #handleSubmitSearch({ detail }: any) {
    this.movieFetcher = new SearchMovieFetcher(detail.keyword);
    this.children.movieList.cleanMovieList().setListName(`${detail.keyword} ${SEARCH_LIST_NAME_SUFFIX}`);
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
