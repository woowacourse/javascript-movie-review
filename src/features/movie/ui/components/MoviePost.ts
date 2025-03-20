import { IMovie } from "../../../../shared/types/movies";

const MoviePost = (movie: IMovie) => {
  const moviePost = document.createElement("li");

  const movieTitle = movie.name ? movie.name : movie.title;
  const movieImgPath = movie.poster_path
    ? `https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}`
    : "images/nullImage.png";

  moviePost.innerHTML = /*html*/ `
    <div class="item">
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
    </div>
  `;

  return moviePost;
};

export default MoviePost;
