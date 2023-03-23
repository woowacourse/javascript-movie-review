import { MOVIE_RETRIEVED, MOVIE_USER_VOTE_UPDATED } from '../constants';
import {
  MAX_VOTE_SCORE,
  STAR_MAX_COUNT,
  USER_VOTE_MESSAGE,
  VOTE_SCORE_AND_STAR_RATIO,
} from '../constants/ui';
import { EmptyStar, FilledStar } from '../assets';
import { $, $$ } from '../utils/domSelector';
import MovieList from '../domain/MovieList';

class UserMovieVote {
  private static instance: UserMovieVote;
  private userVoteStars: HTMLDivElement;
  private temporaryVoteStars: HTMLDivElement;
  private voteMessage: HTMLParagraphElement;
  private voteInfo: HTMLParagraphElement;

  constructor() {
    this.temporaryVoteStars = $<HTMLDivElement>('.vote-stars--temp');
    this.temporaryVoteStars.insertAdjacentHTML(
      'beforeend',
      this.userVoteStarsTemplate('temp-star')
    );
    this.init();
    this.userVoteStars = $<HTMLDivElement>('.vote-stars');
    this.voteMessage = $<HTMLParagraphElement>('.vote-message');
    this.voteInfo = $<HTMLParagraphElement>('.vote-info');
    this.addUserStarEventListener();
  }

  static getInstance(): UserMovieVote {
    if (!UserMovieVote.instance) {
      UserMovieVote.instance = new UserMovieVote();
    }

    return UserMovieVote.instance;
  }

  private init() {
    MovieList.on(MOVIE_RETRIEVED, (event) => {
      const { movie } = (event as CustomEvent).detail;
      this.renderUserVote(movie.userVote);
    });

    MovieList.on(MOVIE_USER_VOTE_UPDATED, (event) => {
      const { userVote } = (event as CustomEvent).detail;
      this.renderUserVote(userVote);
    });
  }

  private userVoteStarsTemplate(className: string, userVoteCount: number = 0) {
    const filledStars: string[] = Array(userVoteCount).fill(FilledStar);
    const emptyStars: string[] = Array(STAR_MAX_COUNT - userVoteCount).fill(EmptyStar);
    const stars = [...filledStars, ...emptyStars];

    return stars
      .map((star, index) => {
        return `
          <img src="${star}" class="${className}" alt="별점" data-star-index="${index}" />`;
      })
      .join('');
  }

  private renderUserVote(userVote: number) {
    const userVoteCount = userVote / VOTE_SCORE_AND_STAR_RATIO;

    this.userVoteStars.replaceChildren();
    this.userVoteStars.insertAdjacentHTML(
      'beforeend',
      this.userVoteStarsTemplate('user-vote-star', userVoteCount)
    );

    this.voteMessage.textContent = USER_VOTE_MESSAGE[userVote];
    this.voteInfo.textContent = `(${userVote}/${MAX_VOTE_SCORE})`;
  }

  private updateUserVoteStarsOnHover(updatedUserVoteCount: number) {
    const userStars = $$<HTMLImageElement>('.temp-star');

    userStars.forEach((element, index) => {
      if (index <= updatedUserVoteCount) {
        element.src = FilledStar;
      } else {
        element.src = EmptyStar;
      }
    });
  }

  private addStarClickedInteraction(starIndex: string) {
    const tempStar = $<HTMLImageElement>(`.temp-star[data-star-index="${starIndex}"]`);
    tempStar.classList.add('star-clicked');

    setTimeout(() => {
      tempStar.classList.remove('star-clicked');
    }, 200);
  }

  private addUserStarEventListener() {
    this.userVoteStars.addEventListener('mouseenter', () => {
      this.temporaryVoteStars.classList.remove('hide');
    });

    this.userVoteStars.addEventListener('mouseleave', () => {
      this.temporaryVoteStars.classList.add('hide');
    });

    this.userVoteStars.addEventListener('mouseover', (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('user-vote-star')) {
        this.updateUserVoteStarsOnHover(Number(target.dataset.starIndex));
      }
    });

    this.userVoteStars.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (!target.classList.contains('user-vote-star')) return;

      this.addStarClickedInteraction(target.dataset.starIndex!);

      const movieId = Number($<HTMLDivElement>('.information-content').dataset.movieId);
      const userVote = (Number(target.dataset.starIndex) + 1) * VOTE_SCORE_AND_STAR_RATIO;

      if (movieId) {
        MovieList.updateUserVote(movieId, userVote);
      }
    });
  }
}

export default UserMovieVote.getInstance();
