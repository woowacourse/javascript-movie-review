import { POSTER_BASE_URL } from '../../api';
import { STAR_MESSAGE } from '../../constants/messages';
import { RULES } from '../../constants/rule';
import { MovieDetail } from '../../domain/Movies';
import { STAR_EMPTY, STAR_FILLED } from '../../resource';

type onStarClick = (movieId: number, event: Event) => void;

interface Props {
  data: MovieDetail;
  onCloseButtonClick: () => void;
  onStarClick: onStarClick;
}

const MovieDetail = ({ data, onCloseButtonClick, onStarClick }: Props) => {
  const container = document.createElement('div');
  const movieDetailContent = document.createElement('div');
  const movieDetailPoster = document.createElement('div');

  container.classList.add('movie-detail-container');
  movieDetailContent.classList.add('movie-detail-content');
  movieDetailPoster.classList.add('movie-detail-poster');

  movieDetailPoster.innerHTML = `<img src="${POSTER_BASE_URL}${data.poster_path}" />`;
  movieDetailContent.appendChild(movieDetailPoster);
  movieDetailContent.appendChild(MovieDetailDescription(data, onStarClick));

  container.appendChild(MovieDetailTitle(data.title, onCloseButtonClick));
  container.appendChild(movieDetailContent);

  return container;
};

const MovieDetailTitle = (title: string, onCloseButtonClick: () => void) => {
  const container = document.createElement('div');
  const h2 = document.createElement('h2');
  const closeButton = document.createElement('button');

  container.classList.add('movie-detail-title-container');
  h2.classList.add('movie-detail-title');
  closeButton.classList.add('movie-detail-close-button');

  h2.textContent = title;
  closeButton.innerHTML = /* html */ `
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7665 1.54966L12.38 0L6.88315 6.14368L1.38632 0L-0.000183105 1.54966L5.49665 7.69333L-0.000183105 13.837L1.38632 15.3867L6.88315 9.24299L12.38 15.3867L13.7665 13.837L8.26965 7.69333L13.7665 1.54966Z" fill="#F1F1F1"/>
    </svg>
  `;

  container.appendChild(h2);
  container.appendChild(closeButton);

  closeButton.addEventListener('click', () => onCloseButtonClick());

  return container;
};

const MovieDetailDescription = (data: MovieDetail, onStarClick: onStarClick) => {
  const movieDetailDescription = document.createElement('div');

  movieDetailDescription.classList.add('movie-detail-description');

  movieDetailDescription.innerHTML = `
    <div class="movie-detail-text-content">
      <div class="genre-info">
        <span>${data.genres.join(RULES.genreSeparator)}</span>
        <span class="movie-detail-vote-average">
          <img src="${STAR_FILLED}" />
          ${data.vote_average.toFixed(RULES.averageDecimalPlaces)}
        </span>
      </div>
      <p class="overview">${data.overview === '' ? '-' : data.overview}</p>
    </div>
  `;

  movieDetailDescription.appendChild(ReviewContainer(data, onStarClick));

  return movieDetailDescription;
};

const ReviewContainer = ({ id, my_grade }: MovieDetail, onStarClick: onStarClick) => {
  const filledStarLength = my_grade / 2;
  const reviewContainer = document.createElement('div');
  const myStars = document.createElement('span');
  const stars = document.createElement('div');

  reviewContainer.classList.add('review-container');
  myStars.classList.add('my-stars');
  stars.classList.add('stars');

  myStars.textContent = '내 별점';

  Array.from({ length: 5 }).forEach((_, index) => {
    if (index < filledStarLength) {
      stars.appendChild(starImage(STAR_FILLED, index));
    } else {
      stars.appendChild(starImage(STAR_EMPTY, index));
    }
  });

  const reviewRateContainer = document.createElement('div');
  const reviewRating = document.createElement('span');
  const reviewText = document.createElement('span');

  reviewRateContainer.classList.add('review-rate-container');
  reviewRating.classList.add('review-rating', 'my-stars');
  reviewText.classList.add('review-text', 'my-stars');

  reviewRating.textContent = String(my_grade);
  reviewText.textContent = STAR_MESSAGE[my_grade];

  reviewRateContainer.appendChild(reviewRating);
  reviewRateContainer.appendChild(reviewText);

  reviewContainer.appendChild(myStars);
  reviewContainer.appendChild(stars);
  reviewContainer.appendChild(reviewRateContainer);

  stars.addEventListener('click', (event) => {
    onStarClick(id, event);
  });

  return reviewContainer;
};

const starImage = (src: string, index: number) => {
  const starImage = document.createElement('img');

  starImage.classList.add('star');
  starImage.dataset['starIndex'] = String(index);
  starImage.src = src;

  return starImage;
};

export default MovieDetail;
