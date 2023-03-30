import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { Skeleton } from './components/Skeleton';
import { Modal } from './components/Modal';
import { ModalInformation } from './ModalInformation';
import Store from './Store';
import { STRING } from './utils/Constant';

class App {
  $header: Header;
  $movieList: MovieList;
  store: Store;
  skeleton: Skeleton;
  modal: Modal;
  modalInformation: ModalInformation;

  constructor() {
    this.$movieList = document.querySelector('movie-list')!;
    this.$header = document.querySelector('movie-header')!;
    this.skeleton = new Skeleton();
    this.store = new Store();
    this.modal = new Modal();
    this.modalInformation = new ModalInformation();

    this.initializeMovieList();

    this.$header.addSearchHandler(this.searchHandler.bind(this));
    this.$header.addClickLogoHandler(this.initializeMovieList.bind(this));
    this.$movieList.modalHandler(
      this.modal.show.bind(this),
      this.modalInformation.setInformationToModal.bind(this),
      this.modalInformation.eventBind.bind(this),
    );
  }

  initializeMovieList() {
    this.store.setInitPage(0);
    this.$movieList.setTitle(STRING.POPULAR_MOVIE);
    this.store.setInitSearchWord();
    this.store.allocateData().then(() => {
      this.skeleton.removeSkeleton();
      this.$movieList.renderMovies(this.store.movieListValue, this.store.genre);
      this.$movieList.infiniteScroll(this.infiniteScrollHandler.bind(this));
    });
  }

  async infiniteScrollHandler() {
    if (this.store.page === this.store.totalPage) return;
    await this.store.allocateData(this.store.searchWord);
    this.$movieList.renderMovies(this.store.movieListValue, this.store.genre);
  }

  searchHandler(value: string) {
    this.skeleton.searchSkeleton();
    this.store.setInitPage(0);
    this.$movieList.setTitle(`"${value}"${STRING.SEARCH_RESULT}`);

    this.store.allocateData(value).then(() => {
      this.$movieList.renderSearchedMovies(this.store.movieListValue, this.store.genre);
      if (this.store.totalPage === 1 || this.store.totalPage === 0) return;
      this.$movieList.infiniteScroll(this.infiniteScrollHandler.bind(this));
    });
  }
}

export default App;
