import MovieList from "../domain/MovieList";
import MovieItem from "./MovieItem";
import { Movie } from "../types/movie";
import { $ } from "../utils/domSelector";

const MovieListContainer = {
  loadMovies: async (searchKey?: string) => {
    try {
      MovieListContainer.render();
      const movies = await MovieList.getMovieData();
      console.log(movies);
      MovieListContainer.render(movies, searchKey);
    } catch (error) {
      console.log(error);
    }
  },

  render: (movies?: Movie[], searchKey?: string) => {
    const template = `
      <section class="item-view">
        <h2>${
          searchKey ? `"${searchKey}" 검색 결과` : "지금 인기 있는 영화"
        }</h2>
        <ul class="item-list">
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
          </li>`.repeat(20)
            : movies.map((movie) => MovieItem.render(movie)).join("")
        }
        </ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      </section>`;

    $<HTMLElement>("main").replaceChildren();
    $<HTMLElement>("main").insertAdjacentHTML("beforeend", template);
    MovieListContainer.onClick();
  },

  onClick: () => {
    $<HTMLButtonElement>("#more-button").addEventListener("click", async () => {
      const movies: Movie[] = await MovieList.getMovieData();
      $<HTMLUListElement>(".item-list").insertAdjacentHTML(
        "beforeend",
        movies.map((movie) => MovieItem.render(movie)).join("")
      );
    });
  },
};

export default MovieListContainer;
