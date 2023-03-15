import MovieList from "../domain/MovieList";
import MovieItem from "./MovieItem";
import { Movie } from "../types/movie";
import { $ } from "../utils/domSelector";

const MovieListContainer = {
  render() {
    return `
      <section class="item-view">
        <h2 id="movie-list-title">지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
      </section>
    `;
  },

  onClick: () => {
    $<HTMLButtonElement>("#more-button").addEventListener("click", async () => {
      const movies: Movie[] = await MovieList.getMovieData();
      $<HTMLUListElement>(".item-list").insertAdjacentHTML(
        "beforeend",
        movies.map((movie) => MovieItem.render(movie)).join("")
      );

      if (movies.length < 20) {
        $<HTMLButtonElement>("#more-button").style.display = "none";
      }
    });
  },
};

export default MovieListContainer;
