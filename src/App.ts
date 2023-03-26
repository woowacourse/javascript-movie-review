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
    this.loadMovieData();
    this.addInitialPageLoadEventListener();
    this.addSaveToLocalStorageEventListener();
  }

  private loadMovieData() {
    MovieList.getMovieData();
  }

  private addInitialPageLoadEventListener() {
    window.addEventListener('load', () => {
      if (!history.state) {
        history.replaceState(
          { isList: true, searchQuery: '', timestamp: new Date().getTime() },
          '',
          PAGE_BASE_URL
        );
      }
    });
  }

  private addSaveToLocalStorageEventListener() {
    window.addEventListener('beforeunload', () => {
      saveToLocalStorage(MovieList.getUserMovies());
      window.scrollTo(0, 0);
    });
  }
}

export default new App();
