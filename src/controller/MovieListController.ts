import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import { MovieItemType } from "../types/movieResultType";

class MovieListController {
  mainElement;
  handleSeeMore;

  constructor(mainElement: HTMLElement, handleSeeMore: () => void) {
    this.mainElement = mainElement;
    this.handleSeeMore = handleSeeMore;
  }

  async render({ movieList, hasMore }: { movieList: MovieItemType[]; hasMore: boolean }) {
    this.renderMovieList({
      movieList,
      hasMore,
    });

    this.bindEvents();
  }

  bindEvents() {
    const seeMoreElement = this.mainElement.querySelector(".see-more");
    seeMoreElement?.addEventListener("click", () => {
      this.handleSeeMore();
    });
  }

  renderMovieList({ movieList, hasMore }: { movieList: MovieItemType[]; hasMore: boolean }) {
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });
    this.mainElement.replaceChildren(sectionElement);
  }

  async addMovieList({ movieList, hasMore }: { movieList: MovieItemType[]; hasMore: boolean }) {
    const movieListContainer = this.mainElement.querySelector("ul");
    if (!movieListContainer) return;

    movieList.forEach((movie) => movieListContainer.appendChild(MovieItem(movie)));

    if (!hasMore) this.mainElement.querySelector(".see-more")?.remove();
  }
}

export default MovieListController;
