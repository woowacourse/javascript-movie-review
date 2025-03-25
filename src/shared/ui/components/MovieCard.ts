import { IMovie } from "../../types/movies";
import { toElement } from "../../utils/toElement";

export default function MovieCard(movieTitle: string, movie: IMovie) {
  const movieImgPath = movie.poster_path
    ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
    : "images/nullImage.png";

  return toElement(`
    <li class="item">
      <button class="movie-card-button">
        <img
          class="thumbnail"
          src=${movieImgPath}
          alt=${movieTitle}
        />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" /><span
              >${movie.vote_average.toFixed(1)}</span
            >
          </p>
          <strong>${movieTitle}</strong>
        </div>
      </button>
    </li>
  `);
}
