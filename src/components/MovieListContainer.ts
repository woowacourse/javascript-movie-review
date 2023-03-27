import MovieList from "../domain/MovieList";
import MovieItem from "./MovieItem";
import InvalidMessage from "./InvalidMessage";
import { Movie } from "../types/movie";
import { $ } from "../utils/domSelector";
import { HTTPError } from "../api/HTTPError";

const MovieListContainer = {
  render() {
    return `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <div id="modal"></div>
        <div id="movie-list-end"></div>
      </section>
    `;
  },

  renderMovieItem: async (searchKey?: string) => {
    const movies: Movie[] = await MovieList.getMovieData();

    $<HTMLUListElement>(".item-list").insertAdjacentHTML(
      "beforeend",
      movies.map((movie) => MovieItem.render(movie)).join("")
    );

    MovieItem.bindClickEvent();

    if (searchKey && !movies.length) {
      MovieListContainer.hideTitle();
      InvalidMessage.renderNoSearchMessage(searchKey);
    }
  },

  onScroll: () => {
    try {
      MovieListContainer.renderMovieItem();
    } catch (error) {
      if (error instanceof HTTPError) {
        InvalidMessage.renderErrorMessage(error.statusCode);
      }
    }
  },

  onSearch: async (searchKey: string) => {
    try {
      $<HTMLElement>(
        "#movie-list-title"
      ).textContent = `"${searchKey}" 검색 결과`;
      $<HTMLElement>(".item-list").replaceChildren();

      MovieListContainer.showTitle();
      MovieListContainer.renderMovieItem(searchKey);
      MovieItem.removeSkeleton();
    } catch (error) {
      if (error instanceof HTTPError) {
        InvalidMessage.renderErrorMessage(error.statusCode);
      }
    }
  },

  showTitle: () => {
    $<HTMLHeadingElement>("#movie-list-title").style.display = "block";
  },

  hideTitle: () => {
    $<HTMLHeadingElement>("#movie-list-title").style.display = "none";
  },
};

export default MovieListContainer;
