import { POSTER_BASE_URL } from '../../api';
import { RULES } from '../../constants/rule';
import { MovieDetail } from '../../domain/Movies';
import { STAR_EMPTY, STAR_FILLED } from '../../resource';

interface Props {
  data: MovieDetail;
  onCloseButtonClick: () => void;
}

const MovieDetail = ({
  data: { id, genres, overview, poster_path, title, vote_average },
  onCloseButtonClick,
}: Props) => {
  const container = document.createElement('div');

  container.classList.add('movie-detail-container');

  container.appendChild(MovieDetailTitle(title, onCloseButtonClick));
  container.insertAdjacentHTML(
    'beforeend',
    /* html */ `
    <div class="movie-detail-content">
      <div class="movie-detail-poster">
        <img src="${POSTER_BASE_URL}${poster_path}" />
      </div>
      <div class="movie-detail-description">
        <div class="movie-detail-text-content">
          <div class="genre-info">
            <span>${genres.join(RULES.genreSeparator)}</span>
            <span class="movie-detail-vote-average">
              <img src="${STAR_FILLED}" />
              ${vote_average.toFixed(RULES.averageDecimalPlaces)}
            </span>
          </div>
          <p class="overview">${overview}</p>
        </div>
        <div class="review-container">
          <span class="my-stars">내 별점</span>
          <div class="stars">
            <img src="${STAR_FILLED}" />
            <img src="${STAR_FILLED}" />
            <img src="${STAR_FILLED}" />
            <img src="${STAR_EMPTY}" />
            <img src="${STAR_EMPTY}" />
          </div>
          <div class="review-rate-container">
            <span class="my-stars">6</span>
            <span class="my-stars review-text">보통이에요</span>
          </div>
        </div>
      </div>
    </div>
  `,
  );

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

export default MovieDetail;
