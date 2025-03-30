import { ListTitleRender } from "./ListTitle.js";
import { MovieItemRender, MovieItemMount } from "./MovieItem.js";
import { SkeletonMovieItemRender } from "../Skeleton/SkeletonMovieItem.js";
import { ERROR_MESSAGES, MOVIE_COUNT } from "../../constants/config.js";
import { fetchMoreMovies } from "./fetchMoreMovies.js";
import store from "../../store/store.js";
import { fetchPopularMovies } from "../../APIs/movieAPI.js";

export function MovieListRender({
  movies,
  query,
  searchedMoviesLength,
  isLoading,
}) {
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
      </section>
    </main>
  `;
}

export function MovieListMount() {
  MovieItemMount();

  window.addEventListener("scroll", async () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 300
    ) {
      const state = store.getState();
      if (state.isLoading) return;
      const currentPage =
        Math.floor(state.movies.length / MOVIE_COUNT.UNIT) + 1;

      store.setState({ ...state, isLoading: true });
      await fetchMoreMovies(currentPage);
    }
  });
}
