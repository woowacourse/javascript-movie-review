import { Movie } from '../types/movie';
import { POSTER_BASE_URL, MOVIE_RETRIEVED } from '../constants';
import { $ } from '../utils/domSelector';
import { CloseButton } from '../assets';
import { renderUserVote, renderVoteAverage } from './MovieInformationContent';
import MovieList from '../domain/MovieList';

class MovieInformationModal {
  private static instance: MovieInformationModal;
  private informationModal: HTMLDialogElement;

  constructor() {
    $<HTMLElement>('main').insertAdjacentHTML('beforeend', this.template());
    this.init();
    this.informationModal = $<HTMLDialogElement>('.information-modal');
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
      <dialog class="information-modal">
        <div class="information">
          <img class="information-image" src="" loading="lazy" alt="" />
          <div class="information-container">
            <h3 class="information-title"></h3>
            <p class="information-meta-info margin-bottom-6"></p>
            <p class="information-vote-average-rate"></p>
            <div class="hr"></div>
            <h6 class="information-sub-title">내 별점</h6>
            <div class="information-user-vote">
              <div class="vote-stars"></div>
              <p class="vote-message"></p>
              <p class="vote-info"></p>
            </div>
            <div class="hr"></div>
            <h6 class="information-sub-title">줄거리</h6>
            <p class="information-overview"></p>
          </div>
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

    this.render(movie);
    this.informationModal.showModal();
  }

  private closeModal() {
    if (!history.state.isBackButton) {
      const queryParams = history.state.searchQuery
        ? `/search?q=${history.state.searchQuery}`
        : `/`;

      history.pushState({ showModal: false, timestamp: new Date().getTime() }, '', queryParams);
    }

    this.informationModal.close();
  }

  private render(movie: Movie) {
    const image = $<HTMLImageElement>('.information-image');
    image.src = `${POSTER_BASE_URL}${movie.posterPath}`;

    const title = $<HTMLHeadingElement>('.information-title');
    title.textContent = movie.title;

    const metaInfo = $<HTMLParagraphElement>('.information-meta-info');
    metaInfo.textContent = `${movie.releaseDate.split('-')[0]} · ${movie.genreIds}`;

    renderVoteAverage(movie.voteAverage);
    renderUserVote(movie.userVote);

    const overview = $<HTMLParagraphElement>('.information-overview');
    overview.textContent = movie.overview;
  }

  private addCloseModalEventListener() {
    this.informationModal.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target === event.currentTarget || target.classList.contains('close-button')) {
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
