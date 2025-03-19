import { IMovie } from "../../../shared/types/movies";

const MoviePost = (movie: IMovie) => {
  const movieTitle = movie.name ? movie.name : movie.title;
  return /*html*/ `
  <li>
    <div class="item">
      <img
        class="thumbnail"
        src="https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}"
        alt=${movieTitle}
      />
      <div class="item-desc">
        <p class="rate">
          <img src="./images/star_empty.png" class="star" /><span
            >${movie.vote_average}</span
          >
        </p>
        <strong>${movieTitle}</strong>
      </div>
    </div>
  </li>
  `;
};

export default MoviePost;
