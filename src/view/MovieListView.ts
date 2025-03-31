import MovieItem from "../component/movieList/MovieItem";
import MovieListSection from "../component/movieList/MovieListSection";
import { IMovieItem } from "../types/movieResultType";
import { $ } from "../util/selector";

export default class MovieListView {
  #container: HTMLElement;

  constructor(container: HTMLElement) {
    this.#container = container;
  }

  renderInitialList(movieList: IMovieItem[]) {
    const sectionElement = MovieListSection({ title: "지금 인기 있는 영화", movieList });
    this.#container.replaceChildren(sectionElement);
  }

  appendMovies(movieList: IMovieItem[]) {
    const movieListContainer = $("ul", this.#container);
    if (!movieListContainer) return;
    movieListContainer.append(...movieList.map((movie) => MovieItem(movie)));
  }

  bindMovieClickEvent(onClick: (movieId: number) => void) {
    const ulElement = $("ul", this.#container);
    ulElement?.addEventListener("click", (event) => {
      const item = (event.target as HTMLElement).closest(".item");
      if (item) onClick(Number(item.id));
    });
  }
}
