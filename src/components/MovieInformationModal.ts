import { Movie } from '../types/movie';
import { MOVIE_RETRIEVED } from '../constants';
import { $ } from '../utils/domSelector';
import { CloseButton } from '../assets';
import MovieInformationContent from './MovieInformationContent';
import MovieList from '../domain/MovieList';

class MovieInformationModal {
  private static instance: MovieInformationModal;
  private informationModal: HTMLDialogElement;
  private content: MovieInformationContent;

  constructor() {
    $<HTMLElement>('main').insertAdjacentHTML('beforeend', this.template());
    this.content = new MovieInformationContent();
    this.init();
    this.informationModal = $<HTMLDialogElement>('.information-modal');
    this.addCloseModalEventListener();
    this.addBrowserBackButtonEventListener();
    this.addUserStarEventListener();
  }

  static getInstance(): MovieInformationModal {
    if (!MovieInformationModal.instance) {
      MovieInformationModal.instance = new MovieInformationModal();
    }

    return MovieInformationModal.instance;
  }

  private template() {
    return `
      <dialog class="information-modal">
        <div class="information">
          <div class="information-content"></div>
          <img src="${CloseButton}" alt="" class="close-button" />
        </div>
      </dialog>
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

    $<HTMLDivElement>('.information-content').dataset.movieId = String(movie.id);
    this.content.render(movie);
    document.body.classList.add('hide-overflow');
    this.informationModal.showModal();
  }

  private closeModal() {
    if (!history.state.isBackButton) {
      const queryParams = history.state.searchQuery
        ? `/search?q=${history.state.searchQuery}`
        : `/`;

      history.pushState({ showModal: false, timestamp: new Date().getTime() }, '', queryParams);
    }

    document.body.classList.remove('hide-overflow');
    this.informationModal.close();
  }

  private addCloseModalEventListener() {
    this.informationModal.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target === event.currentTarget || target.classList.contains('close-button')) {
        this.closeModal();
      }
    });
  }

  private addUserStarEventListener() {
    $<HTMLDivElement>('.vote-stars').addEventListener('mouseenter', (event) => {
      if (event.target === event.currentTarget) {
        $<HTMLDivElement>('.vote-stars--temp').classList.remove('hide');
      }
    });

    $<HTMLDivElement>('.vote-stars').addEventListener('mouseleave', (event) => {
      if (event.target === event.currentTarget) {
        $<HTMLDivElement>('.vote-stars--temp').classList.add('hide');
      }
    });

    $<HTMLDivElement>('.vote-stars').addEventListener('mouseover', (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('user-vote-star')) {
        this.content.updateUserVoteStarsOnHover(Number(target.dataset.starIndex));
      }
    });

    $<HTMLDivElement>('.vote-stars').addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('user-vote-star')) {
        const movieId = Number($<HTMLDivElement>('.information-content').dataset.movieId);

        if (movieId) {
          MovieList.updateUserVote(movieId, Number(target.dataset.starIndex) + 1);
        }
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
