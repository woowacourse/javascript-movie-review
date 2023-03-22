import { EmptyStar, FilledStar } from '../assets';
import { MOVIE_USER_VOTE_UPDATED, POSTER_BASE_URL } from '../constants';
import { USER_VOTE_MESSAGE } from '../constants/movieInformation';
import MovieList from '../domain/MovieList';
import { Movie } from '../types/movie';
import { $, $$ } from '../utils/domSelector';

class MovieInformationContent {
  private image: HTMLImageElement;
  private title: HTMLHeadingElement;
  private metaInfo: HTMLParagraphElement;
  private voteAverage: HTMLParagraphElement;
  private userVoteStars: HTMLDivElement;
  private voteComment: HTMLParagraphElement;
  private voteInfo: HTMLParagraphElement;
  private overview: HTMLParagraphElement;

  constructor() {
    $<HTMLDivElement>('.information-content').insertAdjacentHTML('beforeend', this.template());
    this.voteAverage = $<HTMLParagraphElement>('.information-vote-average-rate');
    this.image = $<HTMLImageElement>('.information-image');
    this.title = $<HTMLHeadingElement>('.information-title');
    this.metaInfo = $<HTMLParagraphElement>('.information-meta-info');
    this.userVoteStars = $<HTMLDivElement>('.vote-stars');
    this.voteComment = $<HTMLParagraphElement>('.vote-message');
    this.voteInfo = $<HTMLParagraphElement>('.vote-info');
    this.overview = $<HTMLParagraphElement>('.information-overview');
    this.init();
  }

  template() {
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
          <div class="vote-stars--temp hide">
            ${this.userVoteStarsTemplate('temp-star')}
          </div>
          <p class="vote-message"></p>
          <p class="vote-info"></p>
        </div>
        <div class="hr"></div>
        <h6 class="information-sub-title">줄거리</h6>
        <p class="information-overview"></p>
      </div>`;
  }

  userVoteStarsTemplate(className: string, userVoteCount: number = 0) {
    const userStars: string[] = [];

    Array.from({ length: 5 }, (_, index) => {
      const star = `
        <img src="${
          index < userVoteCount ? FilledStar : EmptyStar
        }" class="${className}" alt="별점" data-star-index="${index}" />`;
      userStars.push(star);
    });

    return userStars.join('');
  }

  private init() {
    MovieList.on(MOVIE_USER_VOTE_UPDATED, (event) => {
      const { userVote } = (event as CustomEvent).detail;
      this.renderUserVote(userVote);
    });
  }

  private renderPosterImage(title: string, imagePath: string) {
    this.image.src = `${POSTER_BASE_URL}${imagePath}`;
    this.image.alt = title;
  }

  private renderTitle(title: string) {
    this.title.textContent = title;
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

  private getUserVoteMessage(userVote: number) {
    return USER_VOTE_MESSAGE[userVote];
  }

  private renderUserVote(userVote: number) {
    const userVoteCount = userVote / 2;

    this.userVoteStars.replaceChildren();
    this.userVoteStars.insertAdjacentHTML(
      'beforeend',
      this.userVoteStarsTemplate('user-vote-star', userVoteCount)
    );

    this.voteComment.textContent = this.getUserVoteMessage(userVote);

    this.voteInfo.textContent = `(${userVote}/10)`;
  }

  private renderOverview(overviewText: string) {
    this.overview.textContent = overviewText ? overviewText : '이 영화는 줄거리가 없습니다.';
  }

  render(movie: Movie) {
    this.renderTitle(movie.title);
    this.renderPosterImage(movie.title, movie.posterPath);
    this.renderMetaInfo(movie.releaseDate, movie.genres);
    this.renderVoteAverage(movie.voteAverage);
    this.renderUserVote(movie.userVote);
    this.renderOverview(movie.overview);
  }

  updateUserVoteStarsOnHover(updatedUserVoteCount: number) {
    const userStars = $$<HTMLImageElement>('.temp-star');

    userStars.forEach((star, index) => {
      if (index <= updatedUserVoteCount) {
        star.src = FilledStar;
      } else {
        star.src = EmptyStar;
      }
    });
  }
}

export default MovieInformationContent;
