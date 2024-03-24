import './style.css';
import { MovieType } from '../../types/movie';
import { NO_IMAGE, STAR_FILLED } from '../../images';
import { MOVIE_PATH } from '../../constants/movie';

// eslint-disable-next-line max-lines-per-function
const createMovieItem = (movie: MovieType) => {
  const movieItem = document.createElement('li');
  const imagePath = movie.poster_path ? `${MOVIE_PATH}/${movie.poster_path}` : NO_IMAGE;

  const templates = /* html */ `
    <a>
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="${imagePath}"
          loading="lazy"
          alt="${movie.title}"
        />
        <p class="item-title">${movie.title}</p>
        <p class="item-score">${movie.vote_average.toFixed(
          1,
        )}<img src=${STAR_FILLED} alt="별점" /></p>
      </div>
    </a>
    `;

  movieItem.innerHTML = templates;
  return movieItem;
};

export default createMovieItem;
