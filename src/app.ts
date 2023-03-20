import { FetchStandard, FetchType } from './types/fetcherType';
import MovieList from './components/MovieList';
import Header from './components/Header';
import MovieFetcher from './domain/MovieFetcher';

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

    this.composeNode().addEvents().renderMovies();
  }

  async renderMovies() {
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

  async searchMovies(keyword: string) {
    this.children.movieList.cleanMovieList();
    this.movieFetcher.setSearchSettings(keyword);
    await this.renderMovies();
  }

  composeNode(): this {
    this.node.appendChild(this.children.header.node);
    this.node.appendChild(this.children.movieList.node);

    return this;
  }

  async handleClickLogo() {
    this.children.movieList.cleanMovieList();
    this.movieFetcher.setPopularSettings();
    await this.renderMovies();
  }

  addEvents() {
    document.addEventListener('searchMovies', async ({ detail }: any) => {
      await this.searchMovies(detail.keyword);
    });

    document.addEventListener('seeMoreMovie', this.renderMovies.bind(this));

    document.addEventListener('click-logo', () => {
      this.handleClickLogo();
    });
    return this;
  }
}

export default App;
