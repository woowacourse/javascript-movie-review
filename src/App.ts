import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import MovieModal from './components/MovieModal';
import { SeeMoreButton } from './components/SeeMoreButton';
import { Skeleton } from './components/Skeleton';
import Store from './Store';
import { $ } from './utils/dom';

class App {
  $movieList: MovieList;
  $seeMoreButton: SeeMoreButton;
  $header: Header;
  $movieModal: MovieModal;
  store: Store;
  skeleton: Skeleton;

  constructor() {
    this.$movieList = $<MovieList>('movie-list');
    this.$seeMoreButton = $<SeeMoreButton>('more-button');
    this.$header = $<Header>('movie-header');
    this.$movieModal = $<MovieModal>('movie-modal');
    this.skeleton = new Skeleton();
    this.store = new Store();

    this.initializeMovieList();

    this.$seeMoreButton.addMoreButtonHandler(this.moreButtonHandler.bind(this));
    this.$header.addSearchHandler(this.searchHandler.bind(this));
    this.$header.addClickLogoHandler(this.initializeMovieList.bind(this));
    this.$movieList.addMovieModalHandler(this.movieModalHandler.bind(this));
  }

  initializeMovieList() {
    this.store.setInitPage(0);
    this.$movieList.setTitle('지금 인기 있는 영화');
    this.store.setInitSearchWord();
    this.store
      .getMovieList()
      .then(() => this.skeleton.removeSkeleton())
      .then(() => this.$movieList.renderMovies(this.store.movieListValue));
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
      if (this.store.totalPage === 1 || this.store.totalPage === 0) this.removeButton();
      this.$movieList.renderSearchedMovies(this.store.movieListValue);
    });
  }

  movieModalHandler(id: number) {
    this.store
      .getMovie(id)
      .then((data) => this.$movieModal.render(data))
      .then(() => this.$movieModal.open());
  }

  removeButton() {
    this.$seeMoreButton.remove();
  }
}

export default App;
