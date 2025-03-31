import MovieEmptySection from "../component/movieList/MovieEmptySection";
import MovieItem from "../component/movieList/MovieItem";
import MovieListSection from "../component/movieList/MovieListSection";
import { IMovieItem } from "../types/movieResultType";
import { $ } from "../util/selector";

export default class SearchMovieListView {
  #container: HTMLElement;

  constructor(container: HTMLElement) {
    this.#container = container;
  }

  renderInitialList(movieList: IMovieItem[], keyword: string) {
    const sectionElement =
      movieList.length > 0
        ? MovieListSection({ title: `"${keyword}" 검색 결과`, movieList })
        : MovieEmptySection(`"${keyword}" 검색 결과`);

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
