import MovieItem from "../component/MovieItem";
import SkeletonMovieItem from "../component/Skeleton/SkeletonMovieItem";
import mainElement from "../dom/mainElement";
import { IMovieItem } from "../types/movieResultType";
import { $ } from "../util/selector";

class MovieListView {
  listTitleElement;
  ulElement;
  seeMoreBtn;

  constructor() {
    this.listTitleElement = $(".list-title", mainElement)!;
    this.ulElement = $<HTMLUListElement>("ul", mainElement)!;
    this.seeMoreBtn = $(".see-more", mainElement)!;
  }

  appendMovieList(movieList: IMovieItem[]) {
    const items = movieList.map((movie) => MovieItem(movie));
    this.ulElement.append(...items);
  }

  appendLoadingSkeleton(count: number) {
    const skeletons = Array.from({ length: count }, () => SkeletonMovieItem());
    this.ulElement.append(...skeletons);
    return skeletons;
  }

  removeSkeletons(skeletons: HTMLElement[]) {
    skeletons.forEach((el) => el.remove());
  }

  toggleSeeMore(show: boolean) {
    this.seeMoreBtn.style.display = show ? "block" : "none";
  }

  bindSeeMoreClick(callback: () => void) {
    this.seeMoreBtn.addEventListener("click", callback);
  }
}

export default MovieListView;
