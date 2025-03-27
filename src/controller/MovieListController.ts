import MovieItem from "../component/MovieItem";
import MovieListSection from "../component/MovieListSection";
import { MovieItemType } from "../types/movieResultType";

interface MovieListControllerType {
  mainElement: HTMLElement;
  handleSeeMore: () => void;
  openDetailModal: (id: number) => void;
}

class MovieListController {
  mainElement;
  handleSeeMore;
  openDetailModal;

  constructor({ mainElement, handleSeeMore, openDetailModal }: MovieListControllerType) {
    this.mainElement = mainElement;
    this.handleSeeMore = handleSeeMore;
    this.openDetailModal = openDetailModal;
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

    this.mainElement.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const item = target.closest("div.item");

      if (item) {
        this.openDetailModal(Number(item.id));
      }
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
