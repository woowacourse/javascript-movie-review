import { Movie } from '../types/movie';
import { MOVIE_RETRIEVED } from '../constants';
import { $ } from '../utils/domSelector';
import { CloseButton } from '../assets';
import MovieList from '../domain/MovieList';

class MovieInformationModal {
  private static instance: MovieInformationModal;
  private modal: HTMLDivElement;
  private informationContainer: HTMLDivElement;

  constructor() {
    $<HTMLElement>('main').insertAdjacentHTML('beforeend', this.template());
    this.init();
    this.modal = $<HTMLDivElement>('.modal');
    this.informationContainer = $<HTMLDivElement>('.information-content');
    this.addCloseModalEventListener();
    this.addBrowserBackButtonEventListener();
  }

  static getInstance(): MovieInformationModal {
    if (!MovieInformationModal.instance) {
      MovieInformationModal.instance = new MovieInformationModal();
    }

    return MovieInformationModal.instance;
  }

  private template() {
    return `
      <div class="modal hide">
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <div class="information-content"></div>
          <img src="${CloseButton}" alt="" class="close-button" />
        </div>
      </div>
      <div class="modal-message-container"></div>
    `;
  }

  private init() {
    MovieList.on(MOVIE_RETRIEVED, (event) => {
      const { movie, searchQuery } = (event as CustomEvent).detail;
      this.openModal(movie, searchQuery);
    });
  }

  private openModal(movie: Movie, searchQuery: string) {
    const queryParams = searchQuery
      ? `/search?q=${searchQuery}&id=${movie.id}`
      : `/?id=${movie.id}`;

    if (!history.state.isBackButton) {
      history.pushState(
        { showModal: true, movieId: movie.id, searchQuery, timestamp: new Date().getTime() },
        '',
        queryParams
      );
    }

    this.informationContainer.dataset.movieId = String(movie.id);
    document.body.classList.add('hide-overflow');
    this.modal.classList.remove('hide');
  }

  private closeModal() {
    if (!history.state.isBackButton) {
      const queryParams = history.state.searchQuery
        ? `/search?q=${history.state.searchQuery}`
        : `/`;

      history.pushState({ showModal: false, timestamp: new Date().getTime() }, '', queryParams);
    }

    document.body.classList.remove('hide-overflow');
    this.modal.classList.add('hide');
  }

  private addCloseModalEventListener() {
    this.modal.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (
        target.classList.contains('modal-backdrop') ||
        target.classList.contains('close-button')
      ) {
        this.closeModal();
      }
    });
  }

  private addBrowserBackButtonEventListener() {
    window.addEventListener('popstate', (event) => {
      if (!event.state) return;

      event.state.isBackButton = true;

      if (event.state.showModal) {
        MovieList.getMovieInformation(event.state.movieId);
      }

      if (!event.state.showModal) {
        this.closeModal();
      }
    });
  }
}

export default MovieInformationModal.getInstance();
