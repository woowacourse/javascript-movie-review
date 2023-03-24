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
        <div id="movie-list-end"></div>
      </section>
    `;
  },

  setScrollObserver() {
    const observer = new IntersectionObserver(() => this.onScrollToEnd(), {
      root: document.querySelector("#scrollArea"),
    });

    observer.observe($<HTMLDivElement>("#movie-list-end"));
  },

  onScrollToEnd: async () => {
    const movies: Movie[] = await MovieList.getMovieData();

    $<HTMLUListElement>(".item-list").insertAdjacentHTML(
      "beforeend",
      movies.map((movie) => MovieItem.render(movie)).join("")
    );
    MovieItem.bindClickEvent();
  },

  showTitle: () => {
    $<HTMLHeadingElement>("#movie-list-title").style.display = "block";
  },

  hideTitle: () => {
    $<HTMLHeadingElement>("#movie-list-title").style.display = "none";
  },
};

export default MovieListContainer;
