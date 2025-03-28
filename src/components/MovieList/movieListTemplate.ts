import ListTitle from "./ListTitle";
import MovieItem from "./MovieItem";
import SkeletonMovieItem from "../Skeleton/SkeletonMovieItem";
import { ERROR_MESSAGES, MOVIE_COUNT } from "../../constants/config";
import { Movie } from "../../../types/movieList";

export const fullMovieListTemplate = (
  movies: Movie[],
  query: string
): string => /* html */ `
  <main>
    <section>
      ${ListTitle(query)}
      <ul id="movie-list" class="thumbnail-list" data-testid="movie-list">
        ${movieItemsTemplate(movies, query)}
      </ul>
    </section>
  </main>
`;

export const movieItemsTemplate = (movies: Movie[], query: string): string => {
  if (movies.length === 0) {
    if (query) {
      return /* html */ `
        <div></div>
        <div></div>
        <div class="center">
          <img src="./images/not_found.png"/>
          <h2 data-testid="no-result-message">${ERROR_MESSAGES.NO_RESULT}</h2>
        </div>
      `;
    }
    return new Array(MOVIE_COUNT.UNIT)
      .fill(0)
      .map(() => SkeletonMovieItem())
      .join("");
  }
  return movies.map(MovieItem).join("");
};
