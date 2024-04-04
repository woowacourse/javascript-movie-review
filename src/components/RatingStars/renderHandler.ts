import createElement from '../../utils/createElement';
import starFilled from '../../../templates/star_filled.png';
import starEmpty from '../../../templates/star_empty.png';
import { saveRatingOnClick, updateStarsOnHover } from './eventHandler';

const updateStars = (starsContainer: HTMLElement, rating: number | null): void => {
  const filledStars = rating ? Math.floor(rating / 2) : 0;
  Array.from(starsContainer.children).forEach((star, index) => {
    if (star.classList.contains('star')) {
      (star as HTMLImageElement).src = index < filledStars ? starFilled : starEmpty;
    }
  });
};

const getMovieRating = (movieId: number) => {
  type MovieRating = {
    movieId: number;
    rating: number;
  };
  const ratingsJson = localStorage.getItem('movieRatings');

  if (ratingsJson) {
    const ratings: MovieRating[] = JSON.parse(ratingsJson);
    const movieRating = ratings.find((rating) => rating.movieId === movieId);

    if (movieRating) {
      return movieRating.rating;
    }
  }
  return null;
};

const createStars = (movieId: number, starsContainer: HTMLElement): void => {
  const movieRating = getMovieRating(movieId) || 0;

  for (let i = 1; i <= 5; i++) {
    const starImage = createElement('img', {
      src: i * 2 <= movieRating ? starFilled : starEmpty,
      alt: 'Star',
      className: 'star',
      'data-rating': (i * 2).toString(),
    });

    starImage.addEventListener('mouseover', updateStarsOnHover(updateStars.bind(null, starsContainer), i * 2));
    starImage.addEventListener('click', (event) => {
      saveRatingOnClick({ rating: i * 2, movieId })();
      updateScoreComment(starsContainer, i * 2);
    });

    starsContainer.appendChild(starImage);
  }
};

const createScoreComment = (movieRating: number | null) => {
  const scoreComments = ['최악이예요', '별로예요', '보통이에요', '재미있어요', '명작이에요'];
  return createElement('p', {
    className: 'movie-detail-score-comment',
    textContent: movieRating ? scoreComments[movieRating / 2 - 1] : '별점을 평가해주세요.',
  });
};

const updateScoreComment = (starsContainer: HTMLElement, rating: number) => {
  const scoreComment = starsContainer.querySelector('.movie-detail-score-comment');
  if (scoreComment) {
    scoreComment.textContent = createScoreComment(rating).textContent;
  }
};

const renderHandler = (movieId: number): HTMLElement => {
  const movieRating = getMovieRating(movieId);

  const starsContainer = createElement('div');
  starsContainer.addEventListener('mouseleave', () => {
    updateStars(starsContainer, getMovieRating(movieId));
    updateScoreComment(starsContainer, getMovieRating(movieId) || 0);
  });

  createStars(movieId, starsContainer);
  const movieScoreComment = createScoreComment(movieRating);
  starsContainer.appendChild(movieScoreComment);
  return starsContainer;
};

export default renderHandler;
