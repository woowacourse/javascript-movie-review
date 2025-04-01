import { Movie } from "../../../../shared/types/domain/movies";
import URL from "../../../../shared/constants/url";

const MoviePost = (movie: Movie) => {
  const moviePost = document.createElement("li");

  const movieImgPath = movie.posterPath
    ? `${URL.BASE_POSTER_IMAGE}${movie.posterPath}`
    : URL.NULL_IMAGE;

  moviePost.innerHTML = /*html*/ `
    <div class="item" id=${movie.id}>
      <img
        class="thumbnail"
        src=${movieImgPath}
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img src="${URL.BASE_STAR_IMAGE}empty.png" class="star" /><span
            >${movie.voteAverage.toFixed(1)}</span
          >
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>
  `;

  return moviePost;
};

export default MoviePost;
