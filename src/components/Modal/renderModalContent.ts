import { BASE_IMAGE_URL, DETAIL_IMAGE_WIDTH } from '../../constants/api/api';
import { MovieDetailProps, MovieGenre, StarRate } from '../../types/movie';
import createElement from '../../utils/createElement';
import filledStarImage from '../../../templates/star_filled.png';
import unfilledStarImage from '../../../templates/star_empty.png';
import formatToDecimalPlaces from '../../utils/formatToDecimalPlaces';
import isElement from '../../utils/isElement';
import MATCHED_STAR_RATING from '../../constants/api/starRating';
import defaultImageSrc from '../../../templates/skeleton.png';
import { MAX_STAR_LENGTH, RATE_STANDARD } from '../../constants/api/starRating';

const createCloseButton = () => {
  const closeContainer = createElement('div', { className: 'close-container' });
  const close = createElement('p', {
    textContent: 'X',
    className: 'close-text',
  });

  closeContainer.appendChild(close);

  return closeContainer;
};

/* eslint-disable  max-lines-per-function */
const createMovieDetailTitle = (movieTitle: string) => {
  const titleContainer = createElement('div', {
    className: 'detail-title-container',
  });
  const title = createElement('h2', {
    textContent: movieTitle,
    className: 'detail-movie-title',
  });
  const closeContainer = createCloseButton();

  titleContainer.appendChild(title);
  titleContainer.appendChild(closeContainer);

  return titleContainer;
};

/* eslint-disable  max-lines-per-function */
const createMovieDetailImage = (imageSrc: string) => {
  const imageContainer = createElement<HTMLDivElement>('div', { className: 'detail-image-container' });
  const image = createElement<HTMLImageElement>('img', {
    src: defaultImageSrc,
    alt: '포스터 이미지',
    className: 'detail-image',
  });

  image.onload = () => {
    if (image.src === defaultImageSrc) {
      image.src = `${BASE_IMAGE_URL}${DETAIL_IMAGE_WIDTH}${imageSrc}`;
    }
  };

  imageContainer.appendChild(image);

  return imageContainer;
};

/* eslint-disable  max-lines-per-function */
const createImageAndVoteAverage = (vote_average: number) => {
  const container = createElement('div', {
    className: 'image-average-container',
  });
  const starImage = createElement('img', {
    src: filledStarImage,
    alt: 'star-image',
    className: 'star-image',
  });
  const voteAverage = createElement('p', {
    textContent: formatToDecimalPlaces(vote_average, 1),
  });

  container.appendChild(starImage);
  container.appendChild(voteAverage);

  return container;
};

/* eslint-disable  max-lines-per-function */
const createGenreAndVoteAverage = (movieGenres: MovieGenre[], vote_average: number) => {
  const totalGenreText = movieGenres.join(', ');
  const container = createElement('div', {
    className: 'genre-and-rate-container',
  });
  const genresText = createElement('p', {
    textContent: totalGenreText,
    className: 'movie-genre',
  });
  const imageAndVoteAverage = createImageAndVoteAverage(vote_average);

  container.appendChild(genresText);
  container.appendChild(imageAndVoteAverage);

  return container;
};

const createMovieDetailOverview = (movieOverview: string) => {
  const container = createElement('div', { className: 'overview-container' });
  const overviewContent = createElement('p', {
    className: 'overview-text',
    textContent: movieOverview,
  });

  container.appendChild(overviewContent);

  return container;
};

const createIndividualStarImage = (totalRate: number, currentRate: number) => {
  const star = createElement<HTMLImageElement>('img', {
    className: 'star',
    rate: totalRate.toString(),
    src: totalRate <= currentRate ? filledStarImage : unfilledStarImage,
  });

  return star;
};

export const createFiveStarRates = (star_rating: number) => {
  const fragment = document.createDocumentFragment();
  for (let rate = RATE_STANDARD; rate <= MAX_STAR_LENGTH; rate += RATE_STANDARD) {
    const star = createIndividualStarImage(rate, star_rating);
    fragment.appendChild(star);
  }

  return fragment;
};

const createTotalStarRate = (star_rating: number) => {
  const starsContainer = createElement('div', { className: 'stars-container' });

  const fiveStars = createFiveStarRates(star_rating);

  starsContainer.appendChild(fiveStars);

  return starsContainer;
};

const matchRateToString = (star_rating: StarRate) => {
  return MATCHED_STAR_RATING.find((star) => star.RATE === star_rating)?.TEXT;
};

const createRateToNumber = (star_rating: StarRate) => {
  const rateToNumberContainer = createElement('div', {
    className: 'rate-number-container',
  });

  const rateToNumber = createElement('p', {
    className: 'rate-number',
    textContent: star_rating.toString(),
  });

  rateToNumberContainer.appendChild(rateToNumber);
  return rateToNumberContainer;
};

const createRateToString = (star_rating: StarRate) => {
  const rateToTextContainer = createElement('div', {
    className: 'rate-string-container',
  });

  const rateToTextValue = matchRateToString(star_rating) ?? '명작이에요';

  const rateToString = createElement('p', {
    className: 'rate-string',
    textContent: rateToTextValue,
  });

  rateToTextContainer.appendChild(rateToString);

  return rateToTextContainer;
};

/* eslint-disable  max-lines-per-function */
const createStarRateComponent = (star_rating: StarRate) => {
  const rateContainer = createElement('div', { className: 'rate-container' });
  const starsContainer = createTotalStarRate(star_rating);

  const rateToNumberContainer = createRateToNumber(star_rating);
  const rateToTextContainer = createRateToString(star_rating);

  rateContainer.appendChild(starsContainer);
  rateContainer.appendChild(rateToNumberContainer);
  rateContainer.appendChild(rateToTextContainer);

  return rateContainer;
};

const createMyRateText = () => {
  const textContainer = createElement('div', { className: 'text-container' });
  const text = createElement('p', {
    className: 'star-rate-text',
    textContent: '내 별점',
  });

  textContainer.appendChild(text);

  return textContainer;
};

const createMovieDetailStarRating = (star_rating: StarRate) => {
  const container = createElement('div', { className: 'star-rate-container' });
  const textContainer = createMyRateText();
  const rateContainer = createStarRateComponent(star_rating);

  container.appendChild(textContainer);
  container.appendChild(rateContainer);

  return container;
};

/* eslint-disable  max-lines-per-function */
const createMovieInfoContainer = ({ genres, vote_average, overview, star_rating = 0 }: Partial<MovieDetailProps>) => {
  const infoContainer = createElement('div', {
    className: 'info-container',
  });

  if (genres && vote_average && overview && star_rating >= 0) {
    const movieGenreAndVoteAverage = createGenreAndVoteAverage(genres, vote_average);
    const movieOverView = createMovieDetailOverview(overview);
    const starRating = createMovieDetailStarRating(star_rating);

    infoContainer.appendChild(movieGenreAndVoteAverage);
    infoContainer.appendChild(movieOverView);
    infoContainer.appendChild(starRating);
  }
  return infoContainer;
};

/* eslint-disable  max-lines-per-function */
const ImageAndInfoComponent = ({
  poster_path,
  genres,
  vote_average,
  overview,
  star_rating = 0,
}: Partial<MovieDetailProps>) => {
  const imageAndInfoContainer = createElement('div', {
    className: 'image-info-container',
  });

  if (overview?.length === 0) {
    const noneInfo = createElement('h2', { textContent: '영화 정보가 존재하지 않아요!' });

    imageAndInfoContainer.appendChild(noneInfo);
  }

  if (poster_path && genres && vote_average && overview && overview.length > 0 && star_rating >= 0) {
    const movieImage = createMovieDetailImage(poster_path);

    const infoContainer = createMovieInfoContainer({ genres, vote_average, overview, star_rating });
    imageAndInfoContainer.appendChild(movieImage);
    imageAndInfoContainer.appendChild(infoContainer);
  }

  return imageAndInfoContainer;
};

/* eslint-disable  max-lines-per-function */
const renderModalContent = ({
  title,
  genres,
  vote_average,
  poster_path,
  overview,
  star_rating = 0,
}: MovieDetailProps) => {
  const movieDetailContainer = createElement('div', {
    className: 'detail-container',
  });

  const movieDetailTitle = createMovieDetailTitle(title);
  movieDetailContainer.appendChild(movieDetailTitle);

  const imageAndInfoComponent = ImageAndInfoComponent({ poster_path, genres, vote_average, overview, star_rating });
  movieDetailContainer.appendChild(imageAndInfoComponent);

  const modalContainer = document.querySelector('.modal-container');
  if (!isElement(modalContainer)) return;

  modalContainer.appendChild(movieDetailContainer);
};

export default renderModalContent;
