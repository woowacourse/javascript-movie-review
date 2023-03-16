import MovieList from "../domain/MovieList";
import MovieItem from "./MovieItem";
import InvalidMessage from "./InvalidMessage";
import { Movie } from "../types/movie";
import { $ } from "../utils/domSelector";
import { MOVIE_MAX_COUNT } from "../constants";

const MovieListContent = {
  loadMovies: async (searchKey?: string) => {
    try {
      $<HTMLButtonElement>("#movie-list-title").style.display = "block";
      $<HTMLButtonElement>("#more-button").style.display = "block";

      if (searchKey) {
        $<HTMLElement>(
          "#movie-list-title"
        ).textContent = `"${searchKey}" 검색 결과`;
      }

      MovieListContent.render();
      const movies = await MovieList.getMovieData();

      MovieListContent.render(movies);

      if (movies.length < MOVIE_MAX_COUNT) {
        $<HTMLButtonElement>("#more-button").style.display = "none";
      }

      if (searchKey && movies.length === 0) {
        $<HTMLButtonElement>("#movie-list-title").style.display = "none";
        InvalidMessage.renderNoSearchMessage(searchKey);
        return;
      }
    } catch (error) {
      InvalidMessage.renderErrorMessage();
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
