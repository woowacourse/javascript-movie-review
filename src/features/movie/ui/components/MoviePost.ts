import { IMovie } from "../../../../shared/types/movies";
import { toElement } from "../../../../shared/utils/toElement";

export default function MoviePost(movie: IMovie) {
  const movieTitle = movie.name ? movie.name : movie.title;
  const movieImgPath = movie.poster_path
    ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
    : "images/nullImage.png";

  return toElement(`
    <li class="item">
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
    </li>
  `);
}
