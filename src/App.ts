import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { SeeMoreButton } from './components/SeeMoreButton';
import { Skeleton } from './components/Skeleton';
import Store from './Store';

class App {
  $movieList: MovieList;
  $seeMoreButton: SeeMoreButton;
  $header: Header;
  store: Store;
  skeleton: Skeleton;

  constructor() {
    this.$movieList = document.querySelector('movie-list')!;
    this.$seeMoreButton = document.querySelector('more-button')!;
    this.$header = document.querySelector('movie-header')!;
    this.skeleton = new Skeleton();
    this.store = new Store();

    setTimeout(() => this.initializeMovieList(), 500);

    this.$seeMoreButton.addMoreButtonHandler(this.moreButtonHandler.bind(this));
    this.$header.addSearchHandler(this.searchHandler.bind(this));
    this.$header.addClickLogoHandler(this.initializeMovieList.bind(this));
  }

  initializeMovieList() {
    this.store.setInitPage(0);
    this.$movieList.setTitle('지금 인기 있는 영화');
    this.store.setInitSearchWord();
    this.$seeMoreButton.attach();

    this.store.getMovieList().then(() => {
      this.skeleton.removeSkeleton();
      this.$movieList.renderMovies(this.store.movieListValue);
    });
  }

  moreButtonHandler() {
    this.store.getMovieList(this.store.searchWord).then(() => {
      if (this.store.page === this.store.totalPage) this.removeButton();
      this.$movieList.renderMovies(this.store.movieListValue);
    });
  }

  searchHandler(value: string) {
    this.skeleton.attachSkeleton();
    this.$seeMoreButton.attach();
    this.store.setInitPage(0);
    this.$movieList.setTitle(`"${value}"에 대한 검색 결과`);

    this.store.getMovieList(value).then(() => {
      setTimeout(() => {
        if (this.store.totalPage === 1 || this.store.totalPage === 0) this.removeButton();
        this.$movieList.renderSearchedMovies(this.store.movieListValue);
      }, 500);
    });
  }

  removeButton() {
    this.$seeMoreButton.remove();
  }
}

export default App;
