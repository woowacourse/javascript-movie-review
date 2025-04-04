import { ICustomMovie } from "../../types/movies";
import { toElement } from "../../../../shared/utils/toElement";

export default function MovieCard(movie: ICustomMovie) {
  const movieImgPath = movie.poster_path
    ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
    : "images/nullImage.png";

  return toElement(`
    <li class="item">
      <button class="movie-card-button" id=${movie.id}>
        <img
          class="thumbnail"
          src=${movieImgPath}
          alt=${movie.title}
        />
        <div class="item-desc">
          <p class="rate">
            <img src="./images/star_empty.png" class="star" /><span
              >${movie.vote_average.toFixed(1)}</span
            >
          </p>
          <strong class="movie-card-title">${movie.title}</strong>
        </div>
      </button>
    </li>
  `);
}
