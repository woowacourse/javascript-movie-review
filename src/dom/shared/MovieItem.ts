import { Movie } from "../../apis/movie/type";
import { handleMovieItemClick } from "../eventHandler/handleMovieItemClick.ts";

const createMovieItemTemplate = (movie: Movie) => `
  <li id="${movie.id}">
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

const createMovieItemSkeletonTemplate = () => `
  <li class="skeleton">
    <div class="item">
      <div class="thumbnail"></div>
      <div class="item-desc">
        <p class="rate"></p>
        <p class="title"></p>
      </div>
    </div>
  </li>
`;

export const renderMovieItems = (parent: HTMLElement, movies: Movie[]) => {
  const itemsHTML = movies.map(createMovieItemTemplate).join("");
  parent.insertAdjacentHTML("beforeend", itemsHTML);
  parent.addEventListener("click", handleMovieItemClick);
};

export const renderMovieItemsLoading = (
  parent: HTMLElement,
  count: number = 20,
) => {
  const skeletonsHTML = Array.from(
    { length: count },
    createMovieItemSkeletonTemplate,
  ).join("");
  parent.insertAdjacentHTML("beforeend", skeletonsHTML);
};

export const removeMovieItemsLoading = (parent: HTMLElement) => {
  const skeletons = parent.querySelectorAll(".skeleton");
  skeletons.forEach((skeleton) => skeleton.remove());
};
