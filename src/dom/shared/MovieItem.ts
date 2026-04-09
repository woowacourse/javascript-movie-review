import { Movie } from "../../apis/movie/api";

const createMovieItemTemplate = (movie: Movie) => `
  <li id="movie-${movie.id}">
    <div class="item">
      <img
        class="thumbnail"
        src="${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}"
        alt="${movie.title} 포스터"
      />
      <div class="item-desc">
        <p class="rate">
          <img src="./images/star_empty.png" alt="" class="star" />
          <span>${movie.vote_average}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>
  </li>
`;

export const renderMovieItems = (parent: HTMLElement, movies: Movie[]) => {
  const itemsHTML = movies.map(createMovieItemTemplate).join("");
  parent.insertAdjacentHTML("beforeend", itemsHTML);
};
