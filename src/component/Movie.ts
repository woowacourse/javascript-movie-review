import { IMovie } from "../type";

const POSTER_BASE_URL = "https://media.themoviedb.org/t/p/w440_and_h660_face/";
function Movie({ movie }: { movie: IMovie }) {
  return /*html */ `
  <li>
    <div class="item">
      <img
        class="thumbnail"
        src=${POSTER_BASE_URL}${movie.poster_path}
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img src="images/star_empty.png" class="star" />
          <span>${movie.vote_average.toFixed(1)}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>
  </li>`;
}

export default Movie;
