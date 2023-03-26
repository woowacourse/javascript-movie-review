import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { SeeMoreButton } from './components/SeeMoreButton';
import { Skeleton } from './components/Skeleton';
import { Modal } from './components/Modal';
import { ModalInformation } from './ModalInformation';
import Store from './Store';
import { STRING } from './utils/Constant';

class App {
  $header: Header;
  $movieList: MovieList;
  $seeMoreButton: SeeMoreButton;
  store: Store;
  skeleton: Skeleton;
  modal: Modal;
  modalInformation: ModalInformation;

  constructor() {
    this.$movieList = document.querySelector('movie-list')!;
    this.$seeMoreButton = document.querySelector('more-button')!;
    this.$header = document.querySelector('movie-header')!;
    this.skeleton = new Skeleton();
    this.store = new Store();
    this.modal = new Modal();
    this.modalInformation = new ModalInformation();

    setTimeout(() => this.initializeMovieList(), 500);

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
      this.$seeMoreButton.addMoreButtonHandler(this.moreButtonHandler.bind(this));
    });
  }

  async moreButtonHandler() {
    if (this.store.page === this.store.totalPage) return;
    this.store.allocateData(this.store.searchWord).then(() => {
      this.$movieList.renderMovies(this.store.movieListValue, this.store.genre);
    });
  }

  searchHandler(value: string) {
    this.skeleton.searchSkeleton();
    this.store.setInitPage(0);
    this.$movieList.setTitle(`"${value}"${STRING.SEARCH_RESULT}`);

    this.store.allocateData(value).then(() => {
      setTimeout(() => {
        this.$movieList.renderSearchedMovies(this.store.movieListValue, this.store.genre);
        if (this.store.totalPage === 1 || this.store.totalPage === 0) return;
        this.$seeMoreButton.addMoreButtonHandler(this.moreButtonHandler.bind(this));
      }, 500);
    });
  }
}

export default App;
