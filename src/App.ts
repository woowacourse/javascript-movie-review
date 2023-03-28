import './components/NavBar';
import './components/MovieListContainer';
import './components/MovieTitle';
import './components/MovieListContent';
import './components/MovieInformationModal';
import './components/MovieInformationContent';
import './components/UserMovieVote';
import './components/InvalidMessage';
import { saveToLocalStorage } from './utils/localStorage';
import MovieList from './domain/MovieList';
import { PAGE_BASE_URL } from './constants';

class App {
  constructor() {
    this.addInitialPageLoadEventListener();
    this.addSaveToLocalStorageEventListener();
  }

  private addInitialPageLoadEventListener() {
    window.addEventListener('load', () => {
      if (history.state) {
        this.loadMovies(history.state.searchQuery);
      }

      if (!history.state) {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const searchQuery = params.get('q') ?? '';
        const queryParams = searchQuery ? `search?q=${searchQuery}` : '';

        history.replaceState(
          { isList: true, searchQuery, timestamp: new Date().getTime() },
          '',
          PAGE_BASE_URL + queryParams
        );

        this.loadMovies(searchQuery);
      }
    });
  }

  private loadMovies(searchQuery: string) {
    MovieList.init(searchQuery);
    MovieList.getMovieData();
  }

  private addSaveToLocalStorageEventListener() {
    window.addEventListener('beforeunload', () => {
      saveToLocalStorage(MovieList.getUserMovies());
      window.scrollTo(0, 0);
    });
  }
}

export default new App();
