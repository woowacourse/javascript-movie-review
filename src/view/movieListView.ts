import MovieItem from "../components/MovieItem";
import MovieListSection from "../components/MovieListSection";
import { MovieItemType } from "../types/movieResultType";

class MovieListView {
  mainElement;

  constructor(mainElement: HTMLElement) {
    this.mainElement = mainElement;
  }

  clearMainElement() {
    this.mainElement.innerHTML = "";
  }

  renderMovieList({ movieList, hasMore }: { movieList: MovieItemType[]; hasMore: boolean }) {
    const sectionElement = MovieListSection({
      title: "지금 인기 있는 영화",
      movieList,
      hasMore,
    });

    this.mainElement.appendChild(sectionElement);
  }

  appendMovieList(movieList: MovieItemType[]) {
    const movieListContainer = this.mainElement.querySelector("ul");
    if (!movieListContainer) return;

    movieList.forEach((movie) => {
      movieListContainer.appendChild(MovieItem(movie));
    });
  }

  getSeeMoreElement(): Element {
    return this.mainElement.querySelector(".see-more") as Element;
  }

  handleSeeMoreElement(hasMore: boolean) {
    if (!hasMore) this.mainElement.querySelector(".see-more")?.remove();
  }
}

export default MovieListView;
