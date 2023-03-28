import GotoTopButton from './components/GotoTopButton';
import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import MovieModal from './components/MovieModal';
import { Skeleton } from './components/Skeleton';
import Store from './Store';
import { $ } from './utils/dom';
import { infinityScroll } from './utils/infinityScroll';

class App {
  $movieList: MovieList;
  $header: Header;
  $movieModal: MovieModal;
  $topButton: GotoTopButton;
  store: Store;
  skeleton: Skeleton;
  observer: IntersectionObserver;

  constructor() {
    this.$movieList = $<MovieList>('movie-list');
    this.$header = $<Header>('movie-header');
    this.$movieModal = $<MovieModal>('movie-modal');
    this.$topButton = $<GotoTopButton>('top-button');
    this.skeleton = new Skeleton();
    this.store = new Store();

    this.observer = infinityScroll(this.fetchMovies.bind(this));

    this.initializeMovieList();
    this.$header.addSearchHandler(this.searchHandler.bind(this));
    this.$header.addClickLogoHandler(this.initializeMovieList.bind(this));
    this.$movieList.addMovieModalHandler(this.movieModalHandler.bind(this));
  }

  initializeMovieList() {
    this.store.setInitPage(0);
    this.$movieList.initMovieList();
    this.$movieList.setTitle('지금 인기 있는 영화');
    this.store.setInitSearchWord();
    this.fetchMovies();
  }

  fetchMovies(value = '') {
    this.store
      .getMovieList(value || this.store.searchWord)
      .then((data) => {
        this.skeleton.removeSkeleton();
        return data;
      })
      .then((data) => {
        this.$movieList.renderMovies(data);
      })
      .then(() => this.$movieList.setIntersection(this.infinityScrollHandler.bind(this)));
  }

  searchHandler(value: string) {
    this.skeleton.attachSkeleton();

    this.store.setInitPage(0);
    this.$movieList.initMovieList();
    this.$movieList.setTitle(`"${value}"에 대한 검색 결과`);

    this.fetchMovies(value);
  }

  movieModalHandler(id: number) {
    this.store
      .getMovie(id)
      .then((data) => this.$movieModal.render(data))
      .then(() => this.$movieModal.open());
  }

  infinityScrollHandler(target: Element) {
    this.observer.observe(target);
    this.$topButton.handleTopButtonVisibility();
    if (this.store.page === this.store.totalPages) this.observer.unobserve(target);
  }
}

export default App;
