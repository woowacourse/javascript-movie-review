import Header from '../src/components/Header/Header';
import MovieList from '../src/components/MovieList/MovieList';
import { TITLE } from './consts/message';
import MovieDataLoader from './domain/services/MovieDataLoader';

class App {
  movieDataLoader = new MovieDataLoader();
  itemViewBox = document.querySelector('.item-view');
  movieListBox = document.createElement('ul');
  title = document.createElement('h2');
  movieListInstance: MovieList;

  constructor() {
    this.init();
    this.movieListBox.classList.add('item-list');
    this.movieListInstance = new MovieList({ isLoading: true, movieList: [] });
  }

  async init() {
    this.renderHeader();
    this.renderTitle();

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.movieListBox);

    await this.renderPopularResult();
  }

  // fetchMovies({ props, currentPage }: { props: APIType; currentPage: number }) {
  //   try {
  //     if (props.apiType === 'popular') {
  //       return movieAPI.fetchPopularMovies({ pageNumber: currentPage });
  //     }
  //     return movieAPI.fetchSearchMovies({ pageNumber: currentPage, query: props.query });
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       if (error.message === ERROR_MESSAGE.RESULTS_NOT_FOUND) {
  //         return NotFound();
  //       }
  //       new Toast(error.message);
  //     }
  //   }
  // }

  // export type PopularAPIType = {
  //   apiType: 'popular';
  // };

  // export type SearchAPIType = {
  //   apiType: 'search';
  //   query: string;
  // };

  async renderSearchResult(query: string) {
    this.removeTitle();
    this.renderTitle(query);
    await this.movieDataLoader.renderFirstPage({
      apiType: 'search',
      query,
    });
  }

  async renderPopularResult() {
    this.removeTitle();
    this.renderTitle();
    await this.movieDataLoader.renderFirstPage({ apiType: 'popular' });
  }

  renderHeader() {
    new Header({
      searchEvent: (query: string) => this.renderSearchResult(query),
      movePopularListEvent: () => this.renderPopularResult(),
    });
  }

  renderTitle(query?: string) {
    this.title.id = 'list-title';
    if (!query) this.title.textContent = TITLE.POPULER;
    else this.title.textContent = TITLE.SEARCH_RESULT(query);

    if (!this.itemViewBox) return;
    this.itemViewBox.append(this.title);
  }

  removeTitle() {
    this.title.remove();
  }
}

export default App;
