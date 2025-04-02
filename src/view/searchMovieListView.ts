import MovieEmptySection from "../components/MovieEmptySection";
import MovieItem from "../components/MovieItem";
import MovieListSection from "../components/MovieListSection";
import { MovieItemType } from "../types/movieResultType";

class SeacrhMovieListView {
  mainElement;

  constructor(mainElement: HTMLElement) {
    this.mainElement = mainElement;
  }

  clearMainElement() {
    this.mainElement.innerHTML = "";
  }

  renderMovieList(searchText: string, { movieList, hasMore }: { movieList: MovieItemType[]; hasMore: boolean }) {
    let sectionElement;
    const existingMovieList = movieList.length !== 0;

    if (existingMovieList) {
      sectionElement = MovieListSection({
        title: `"${searchText}" 검색 결과`,
        movieList,
        hasMore,
      });
    } else {
      sectionElement = MovieEmptySection(`"${searchText}" 검색 결과`);
    }

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

export default SeacrhMovieListView;
