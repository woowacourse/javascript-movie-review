import { Movie, MovieRetrievedEventData } from '../types/movie';
import { MOVIE_RETRIEVED, POSTER_BASE_URL } from '../constants';
import { EmptyStar, FilledStar } from '../assets';
import { $ } from '../utils/domSelector';
import MovieList from '../domain/MovieList';
import { EMPTY_OVERVIEW_MESSAGE } from '../constants/ui';

class MovieInformationContent {
  private static instance: MovieInformationContent;
  private image: HTMLImageElement;
  private title: HTMLHeadingElement;
  private metaInfo: HTMLParagraphElement;
  private voteAverage: HTMLParagraphElement;
  private overview: HTMLParagraphElement;

  constructor() {
    $<HTMLDivElement>('.information-content').insertAdjacentHTML('beforeend', this.template());
    this.init();
    this.image = $<HTMLImageElement>('.information-image');
    this.title = $<HTMLHeadingElement>('.information-title');
    this.metaInfo = $<HTMLParagraphElement>('.information-meta-info');
    this.voteAverage = $<HTMLParagraphElement>('.information-vote-average-rate');
    this.overview = $<HTMLParagraphElement>('.information-overview');
  }

  static getInstance(): MovieInformationContent {
    if (!MovieInformationContent.instance) {
      MovieInformationContent.instance = new MovieInformationContent();
    }

    return MovieInformationContent.instance;
  }

  private template() {
    return `
      <img class="information-image" src="" loading="lazy" alt="" />
      <div class="information-container">
        <h3 class="information-title"></h3>
        <p class="information-meta-info margin-bottom-6"></p>
        <p class="information-vote-average-rate"></p>
        <div class="hr"></div>
        <h6 class="information-sub-title">내 별점</h6>
        <div class="information-user-vote">
          <div class="vote-stars"></div>
          <div class="vote-stars--temp hide"></div>
          <p class="vote-message"></p>
          <p class="vote-info"></p>
        </div>
        <div class="hr"></div>
        <h6 class="information-sub-title">줄거리</h6>
        <p class="information-overview"></p>
      </div>`;
  }

  private init() {
    MovieList.on(MOVIE_RETRIEVED, (event: CustomEvent<MovieRetrievedEventData>) => {
      const { movie } = event.detail;
      this.render(movie);
    });
  }

  render(movie: Movie) {
    this.renderTitle(movie.title);
    this.renderPosterImage(movie.title, movie.posterPath);
    this.renderMetaInfo(movie.releaseDate, movie.genres);
    this.renderVoteAverage(movie.voteAverage);
    this.renderOverview(movie.overview);
  }

  private renderTitle(title: string) {
    this.title.textContent = title;
  }

  private renderPosterImage(title: string, imagePath: string) {
    this.image.src = `${POSTER_BASE_URL}${imagePath}`;
    this.image.alt = title;
  }

  private renderMetaInfo(releaseDate: string, genres: string[]) {
    this.metaInfo.textContent = `${releaseDate.split('-')[0]} · ${genres.join(', ')}`;
  }

  private renderVoteAverage(voteAverage: number) {
    const template = `
      평균 
      <img class="vote-average-star" src="${voteAverage ? FilledStar : EmptyStar}" alt="별점" />
      <span class="vote-average">${voteAverage}</span>
    `;

    this.voteAverage.replaceChildren();
    this.voteAverage.insertAdjacentHTML('beforeend', template);
  }

  private renderOverview(overviewText: string) {
    if (overviewText) {
      this.overview.textContent = overviewText;
      this.overview.classList.remove('secondary-text');
      return;
    }

    this.overview.textContent = EMPTY_OVERVIEW_MESSAGE;
    this.overview.classList.add('secondary-text');
  }
}

export default MovieInformationContent.getInstance();
