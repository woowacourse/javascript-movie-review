import { ListTitleRender } from "./ListTitle.js";
import { MovieItemRender } from "./MovieItem.js";
import { MoreButtonMount, MoreButtonRender } from "../MoreButton/MoreButton.js";
import { SkeletonMovieItemRender } from "../Skeleton/SkeletonMovieItem.js";
import { ERROR_MESSAGES, MOVIE_COUNT } from "../../constants/config.js";

export function MovieListRender({ movies, query, searchedMoviesLength }) {
  const showMoreButton = !query || movies.length < searchedMoviesLength;

  let movieContent = "";
  if (movies.length === 0 && !query) {
    movieContent = new Array(MOVIE_COUNT.UNIT)
      .fill(0)
      .map(() => SkeletonMovieItemRender())
      .join("");
  } else if (movies.length === 0 && query) {
    movieContent = `<div></div>
                    <div></div>
                    <div class="center">
                      <img src="./images/not_found.png"/>
                      <h2 data-testid='no-result-message'>${ERROR_MESSAGES.NO_RESULT}</h2>
                    </div>`;
  } else {
    movieContent = movies.map((movie) => MovieItemRender(movie)).join("");
  }

  return /* html */ `
    <main>
      <section>
        ${ListTitleRender({ query })}
        <ul id="movie-list" class="thumbnail-list" data-testid="movie-list">
          ${movieContent}
        </ul>
        ${showMoreButton ? MoreButtonRender() : ""}
      </section>
    </main>
  `;
}

export function MovieListMount() {
  MoreButtonMount();
}
