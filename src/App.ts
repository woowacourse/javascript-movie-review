import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { SeeMoreButton } from './components/SeeMoreButton';
import Store from './Store';

class App {
  $movieList: MovieList;
  $seeMoreButton: SeeMoreButton;
  $header: Header;
  store: Store;

  constructor() {
    this.$movieList = document.querySelector('movie-list')!;
    this.$seeMoreButton = document.querySelector('more-button')!;
    this.$header = document.querySelector('movie-header')!;
    this.store = new Store();
    this.initializeMovieList();

    this.$seeMoreButton.addMoreButtonHandler(this.moreButtonHandler.bind(this));
    this.$header.addSearchHandler(this.searchHandler.bind(this));
  }

  initializeMovieList() {
    this.store.getMovieList().then(() => this.$movieList.renderMovies(this.store.movieListValue));
  }

  moreButtonHandler() {
    this.store
      .getMovieList(this.store.searchWord)
      .then(() => this.$movieList.renderMovies(this.store.movieListValue));
  }

  searchHandler(value: string) {
    this.store.getMovieList(value).then(() => {
      this.$movieList.renderSearchedMovies(this.store.movieListValue);
    });
  }
}

export default App;
