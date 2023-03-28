import ErrorModal from './components/ErrorModal';
import GotoTopButton from './components/GotoTopButton';
import Header from './components/Header';
import MovieList from './components/MovieList';
import MovieModal from './components/MovieModal';
import Skeleton from './components/Skeleton';
import Store from './Store';
import { $ } from './utils/dom';
import { infinityScroll } from './utils/infinityScroll';

class App {
  $movieList: MovieList;
  $header: Header;
  $movieModal: MovieModal;
  $topButton: GotoTopButton;
  $errorModal: ErrorModal;
  store: Store;
  skeleton: Skeleton;
  observer: IntersectionObserver;

  constructor() {
    this.$movieList = $<MovieList>('movie-list');
    this.$header = $<Header>('movie-header');
    this.$movieModal = $<MovieModal>('movie-modal');
    this.$topButton = $<GotoTopButton>('top-button');
    this.$errorModal = $<ErrorModal>('error-modal');
    this.skeleton = new Skeleton();
    this.store = new Store();

    this.observer = infinityScroll(this.fetchMovies.bind(this));

    this.initializeMovieList();
    this.$header.addSearchHandler(this.searchHandler.bind(this));
    this.$header.addClickLogoHandler(this.initializeMovieList.bind(this));
    this.$movieList.addMovieModalHandler(this.movieModalHandler.bind(this));
  }

  initializeMovieList() {
    this.store.initPage();
    this.$movieList.initMovieList();
    this.$movieList.setTitle('지금 인기 있는 영화');
    this.store.initSearchWord();
    this.fetchMovies();
  }

  async fetchMovies(value = '') {
    try {
      const movieList = await this.store.getMovieList(value || this.store.searchWord);
      this.skeleton.removeSkeleton();
      this.$movieList.renderMovies(movieList);
      this.$movieList.setIntersection(this.infinityScrollHandler.bind(this));
    } catch (error) {
      if (!(error instanceof Error)) return;
      this.$errorModal.render(error.message);
    }
  }

  searchHandler(value: string) {
    this.skeleton.attachSkeleton();

    this.store.initPage();
    this.$movieList.initMovieList();
    this.$movieList.setTitle(`"${value}"에 대한 검색 결과`);

    this.fetchMovies(value);
  }

  async movieModalHandler(id: number) {
    try {
      const movie = await this.store.getMovie(id);
      this.$movieModal.render(movie);
      this.$movieModal.open();
    } catch (error) {
      if (!(error instanceof Error)) return;
      this.$errorModal.render(error.message);
    }
  }

  infinityScrollHandler(target: Element) {
    this.observer.observe(target);
    this.$topButton.handleTopButtonVisibility();
    if (this.store.page === this.store.totalPages) this.observer.unobserve(target);
  }
}

export default App;
