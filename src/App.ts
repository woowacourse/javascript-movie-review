import { MovieList } from './components/MovieList';
import { SeeMoreButton } from './components/SeeMoreButton';
import Store from './Store';

class App {
  $movieList: MovieList;
  $seeMoreButton: SeeMoreButton;
  store: Store;

  constructor() {
    this.$movieList = document.querySelector('movie-list')!;
    this.$seeMoreButton = document.querySelector('more-button')!;
    this.store = new Store();
    this.initializeMovieList();

    this.$seeMoreButton.addMoreButtonHandler(this.moreButtonHandler.bind(this));
  }

  initializeMovieList() {
    this.store.getPopularMovieList().then(() => this.$movieList.render(this.store.movieListValue));
  }

  moreButtonHandler() {
    this.store.getPopularMovieList().then(() => this.$movieList.render(this.store.movieListValue));
  }
}

export default App;
