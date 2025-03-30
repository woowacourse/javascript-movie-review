import { ListTitleRender } from "./ListTitle.js";
import { MovieItemRender, MovieItemMount } from "./MovieItem.js";
import { MoreButtonMount, MoreButtonRender } from "../MoreButton/MoreButton.js";
import { SkeletonMovieItemRender } from "../Skeleton/SkeletonMovieItem.js";
import { ERROR_MESSAGES, MOVIE_COUNT } from "../../constants/config.js";

export function MovieListRender({
  movies,
  query,
  searchedMoviesLength,
  isLoading,
}) {
  const showMoreButton = !query || movies.length < searchedMoviesLength;

  let movieContent = "";
  if (isLoading) {
    movieContent = /* html */ `
       <ul id="movie-list" class="thumbnail-list" data-testid="movie-list">
          ${new Array(MOVIE_COUNT.UNIT)
            .fill(0)
            .map(() => SkeletonMovieItemRender())
            .join("")}
        </ul>
      `;
  } else if (movies.length === 0 && query) {
    movieContent = /* html */ `
        <div class="not-found-movie">
          <img src="./images/not_found.png"/>
          <h2 data-testid='no-result-message'>${ERROR_MESSAGES.NO_RESULT}</h2>
        </div>
        <ul id="movie-list" class="thumbnail-list" data-testid="movie-list"></ul>
      `;
  } else {
    movieContent = /* html */ `
        <ul id="movie-list" class="thumbnail-list" data-testid="movie-list">
          ${movies.map((movie) => MovieItemRender(movie)).join("")}
        </ul>
    `;
  }

  return /* html */ `
    <main>
      <section class="movie-list-container">
        ${ListTitleRender({ query })}
          ${movieContent}
        ${showMoreButton ? MoreButtonRender() : ""}
      </section>
    </main>
  `;
}

export function MovieListMount() {
  MovieItemMount();
  MoreButtonMount();
}
