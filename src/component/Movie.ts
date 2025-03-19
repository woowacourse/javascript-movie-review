import { IMovie } from '../type';

const POSTER_BASE_URL = 'https://media.themoviedb.org/t/p/w440_and_h660_face/';
const DEFAULT_IMAGE_URL = 'https://placehold.co/200x300?text=No+Image';

function Movie({ movie }: { movie: IMovie }) {
  const poster_path = movie.poster_path ? POSTER_BASE_URL + movie.poster_path : DEFAULT_IMAGE_URL;

  return /*html */ `
  <li class="item">
      <img
        class="thumbnail"
        src=${poster_path}
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img src="images/star_empty.png" class="star" />
          <span>${movie.vote_average.toFixed(1)}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>

  </li>`;
}

export default Movie;
