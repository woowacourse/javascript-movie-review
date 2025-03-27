// movieListTemplate.ts
import ListTitle from "./ListTitle";
import MovieItem from "./MovieItem";
import SkeletonMovieItem from "../Skeleton/SkeletonMovieItem";
import { ERROR_MESSAGES, MOVIE_COUNT } from "../../constants/config";
import { Movie } from "../../../types/movieList";

interface MovieListTemplateProps {
  movies: Movie[];
  query: string;
  searchedMoviesLength: number;
  loading: boolean;
}

const fullMovieListTemplate = ({
  movies,
  query,
  loading,
}: MovieListTemplateProps): string => {
  return /* html */ `
    <main>
      <section>
        ${ListTitle(query)}
        <ul id="movie-list" class="thumbnail-list" data-testid="movie-list">
          ${movieItemsTemplate({ movies, loading, query })}
        </ul>
      </section>
    </main>
  `;
};

interface MovieItemsTemplateProps {
  movies: Movie[];
  loading: boolean;
  query: string;
}

const movieItemsTemplate = ({
  movies,
  query,
}: MovieItemsTemplateProps): string => {
  let movieContent = "";
  if (movies.length === 0 && !query) {
    movieContent = new Array(MOVIE_COUNT.UNIT)
      .fill(0)
      .map(() => SkeletonMovieItem())
      .join("");
  } else if (movies.length === 0 && query) {
    movieContent = `<div></div>
                    <div></div>
                    <div class="center">
                      <img src="./images/not_found.png"/>
                      <h2 data-testid="no-result-message">${ERROR_MESSAGES.NO_RESULT}</h2>
                    </div>`;
  } else {
    movieContent = movies.map((movie) => MovieItem(movie)).join("");
  }
  return movieContent;
};

export { fullMovieListTemplate, movieItemsTemplate };
