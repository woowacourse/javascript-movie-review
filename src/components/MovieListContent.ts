import MovieList from "../domain/MovieList";
import MovieItem from "./MovieItem";
import InvalidMessage from "./InvalidMessage";
import MovieListContainer from "./MovieListContainer";
import { Movie } from "../types/movie";
import { $ } from "../utils/domSelector";
import { MOVIE_MAX_COUNT } from "../constants";
import { HTTPError } from "../api/HTTPError";

const MovieListContent = {
  loadMovies: async (searchKey?: string) => {
    try {
      MovieListContainer.show();

      if (searchKey) {
        $<HTMLElement>(
          "#movie-list-title"
        ).textContent = `"${searchKey}" 검색 결과`;
      }

      MovieListContent.render();
      const movies = await MovieList.getMovieData();
      MovieListContent.render(movies);

      if (movies.length < MOVIE_MAX_COUNT) {
        MovieListContainer.hideButton();
      }

      if (searchKey && movies.length === 0) {
        MovieListContainer.hideTitle();
        InvalidMessage.renderNoSearchMessage(searchKey);
      }
    } catch (error) {
      if (error instanceof HTTPError) {
        InvalidMessage.renderErrorMessage(error.statusCode);
      }
    }
  },

  render: (movies?: Movie[]) => {
    const errorMessageElement = document.querySelector(".error-message");

    if (errorMessageElement) {
      $<HTMLElement>(".item-view").removeChild(errorMessageElement);
    }

    const template = `
        ${
          !movies
            ? `
        <li>
          <a href="#">
            <div class="item-card">
              <div class="item-thumbnail skeleton"></div>
              <div class="item-title skeleton"></div>
              <div class="item-score skeleton"></div>
            </div>
          </a>
          </li>`.repeat(MOVIE_MAX_COUNT)
            : movies.map((movie) => MovieItem.render(movie)).join("")
        }`;

    $<HTMLElement>(".item-list").replaceChildren();
    $<HTMLElement>(".item-list").insertAdjacentHTML("beforeend", template);
  },
};

export default MovieListContent;
