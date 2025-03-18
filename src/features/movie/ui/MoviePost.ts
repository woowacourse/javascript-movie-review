import { IMovie } from "../../../shared/types/movies";

const MoviePost = (movie: IMovie) => {
  const li = document.createElement("li");

  li.innerHTML = /*html*/ `
    <div class="item">
      <img
        class="thumbnail"
        src="https://media.themoviedb.org/t/p/w440_and_h660_face${movie.poster_path}"
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img src="./images/star_empty.png" class="star" /><span
            >${movie.vote_average}</span
          >
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>
  `;

  return li;
};

export default MoviePost;
