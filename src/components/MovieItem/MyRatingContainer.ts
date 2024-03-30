import { MY_RATING } from '../../constants/INFORMATION';
import DetailMovieData from '../../interfaces/DetailMovieData';
import { starEmpty, starFilled } from '../../resources';
import StarImg from './StarImg';

const MyRatingContainer = {
  create() {
    const myRatingContainer = document.createElement('div');

    const myRatingContent = this.createMyRatingContent();

    myRatingContainer.classList.add('movie-item-detail_my-rating-container');

    myRatingContainer.appendChild(myRatingContent);

    return myRatingContainer;
  },

  createMyRatingContent() {
    const myRatingContent = document.createElement('div');

    const title = this.createTitle();
    const starsContainer = this.createStarsContainer();
    const score = this.createScore();
    const ment = this.createMent();

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

  createStarsContainer() {
    const starsContainer = document.createElement('div');

    starsContainer.classList.add('movie-item-detail_my-rating-stars');

    Array.from({ length: MY_RATING.starCount }).forEach(() => starsContainer.appendChild(StarImg.create(starEmpty)));

    const movieItemDetailMyRatingStars = starsContainer.querySelectorAll('img');

    return starsContainer;
  },
  // 별들을 queryselector로 부르고
  // foreach를 통해 해당 부분에 클릭 이벤트를 달고 인덱스를 넘겨준다
  // 예를 들어 3번째를 클릭하면

  createScore() {
    const score = document.createElement('p');

    score.textContent = MY_RATING.score[0];

    return score;
  },

  createMent() {
    const ment = document.createElement('p');

    ment.textContent = MY_RATING.ment[0];

    return ment;
  },
};

export default MyRatingContainer;
