import './style.css';
import { MovieType } from '../../types/movie';
import { STAR_FILLED } from '../../images';

// eslint-disable-next-line max-lines-per-function
const createMovieItem = (movie: MovieType) => {
  const movieItem = document.createElement('li');

  const templates = /* html */ `
    <a href="#">
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}"
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
