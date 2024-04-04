import { MY_RATING } from '../../../constants/INFORMATION';
import UserMoviesStorage from '../../../domain/UserMoviesStorage/UserMoviesStorage';
import DetailMovieData from '../../../interfaces/DetailMovieData';
import { starEmpty, starFilled } from '../../../resources';
import UserVote from '../../../typeAliases/UserVote';
import StarImg from '../../StarImg/StarImg';
import HandleStarOnClickProps from '../../../interfaces/HandleStarOnClickProps';
import ChangeMyRatingContentProps from '../../../interfaces/ChangeMyRatingContentProps';
import './MyRatingContainer.css';

const MyRatingContainer = {
  create(detailMovieData: DetailMovieData) {
    const myRatingContainer = document.createElement('div');

    const myRatingContent = this.createMyRatingContent(detailMovieData);

    myRatingContainer.classList.add('movie-item-detail_my-rating-container');

    myRatingContainer.appendChild(myRatingContent);

    return myRatingContainer;
  },

  createMyRatingContent(detailMovieData: DetailMovieData) {
    const myRatingContent = document.createElement('div');

    const title = this.createTitle();
    const starsContainer = this.createStarsContainer(detailMovieData);
    const score = this.createScore(detailMovieData);
    const ment = this.createMent(detailMovieData);

    myRatingContent.classList.add('movie-item-detail_my-rating-content');

    myRatingContent.appendChild(title);
    myRatingContent.appendChild(starsContainer);
    myRatingContent.appendChild(score);
    myRatingContent.appendChild(ment);

    return myRatingContent;
  },

  createTitle() {
    const title = document.createElement('h2');

    title.textContent = MY_RATING.title;

    return title;
  },

  createStarsContainer(detailMovieData: DetailMovieData) {
    const starsContainer = document.createElement('div');

    starsContainer.classList.add('movie-item-detail_my-rating-stars');

    this.createStars(detailMovieData, starsContainer);

    return starsContainer;
  },

  createStars(detailMovieData: DetailMovieData, starsContainer: HTMLElement) {
    starsContainer.replaceChildren();

    const userMovie = UserMoviesStorage.getMatchedUserMovie(detailMovieData);

    if (userMovie) {
      const starFilledCount = Number(userMovie.user_vote) / 2;
      const starEmptyCount = MY_RATING.starCount - starFilledCount;

      Array.from({ length: starFilledCount }).forEach(() => starsContainer.appendChild(StarImg.create(starFilled)));
      Array.from({ length: starEmptyCount }).forEach(() => starsContainer.appendChild(StarImg.create(starEmpty)));
    } else {
      Array.from({ length: MY_RATING.starCount }).forEach(() => starsContainer.appendChild(StarImg.create(starEmpty)));
    }

    this.setStarHandler(detailMovieData, starsContainer);
  },

  setStarHandler(detailMovieData: DetailMovieData, starsContainer: HTMLElement) {
    const stars = starsContainer.querySelectorAll('img');

    stars.forEach((star, index) => {
      star.classList.add('movie-item-detail_my-rating-star');

      star.addEventListener('click', () => {
        this.handleStarOnClick({ detailMovieData, index, star, starsContainer });
      });
    });
  },

  handleStarOnClick({ detailMovieData, index, star, starsContainer }: HandleStarOnClickProps) {
    this.addNewUserMovie(detailMovieData);
    this.updateUserVote(detailMovieData, index);
    this.changeMyRatingContent({ detailMovieData, star, starsContainer });
  },

  addNewUserMovie(detailMovieData: DetailMovieData) {
    if (!UserMoviesStorage.getMatchedUserMovie(detailMovieData)) UserMoviesStorage.addUserMovie(detailMovieData);
  },

  updateUserVote(detailMovieData: DetailMovieData, index: number) {
    const userMovie = UserMoviesStorage.getMatchedUserMovie(detailMovieData);

    if (userMovie) {
      userMovie.user_vote = String((index + 1) * 2) as UserVote;

      UserMoviesStorage.setMatchedUserMovie(userMovie);
    }
  },

  changeMyRatingContent({ detailMovieData, star, starsContainer }: ChangeMyRatingContentProps) {
    const updatedUserMovie = UserMoviesStorage.getMatchedUserMovie(detailMovieData);

    if (updatedUserMovie) {
      const score = star.parentNode?.nextSibling;
      if (score) score.textContent = updatedUserMovie.user_vote;

      const ment = star.parentNode?.nextSibling?.nextSibling;
      if (ment) ment.textContent = MY_RATING.ment[updatedUserMovie.user_vote];

      this.createStars(detailMovieData, starsContainer);
    }
  },

  createScore(detailMovieData: DetailMovieData) {
    const score = document.createElement('p');

    const userMovie = UserMoviesStorage.getMatchedUserMovie(detailMovieData);

    if (userMovie) score.textContent = userMovie.user_vote;
    else score.textContent = MY_RATING.default;

    return score;
  },

  createMent(detailMovieData: DetailMovieData) {
    const ment = document.createElement('p');

    const userMovie = UserMoviesStorage.getMatchedUserMovie(detailMovieData);

    if (userMovie) ment.textContent = MY_RATING.ment[userMovie.user_vote];
    else ment.textContent = MY_RATING.ment[MY_RATING.default];

    return ment;
  },
};

export default MyRatingContainer;
