import "./style.css";

import createMoviePoster, { MovieInfo } from "../MoviePoster/createMoviePoster";

import { $ } from "../../utils/selector";
import createElement from "../../utils/createElement";
import createNetworkFallback from "../NetworkErrorFallBack/createNetworkErrorFallback";
import createSkeletonMoviePoster from "../MoviePoster/createSkeletonMoviePoster";
import createSeeMoreButton from "../Button/createSeeMoreButton";

export type MoviePosterType = "popular" | "search";
const numberOfPosters = 20;

class MoviePosterBoard {
  public element;
  private moviePosterUl: HTMLElement;
  private seeMoreButton;

  constructor(posterType: MoviePosterType, movieName?: string) {
    const description = this.createDescription(posterType, movieName);
    this.element = this.createSectionElement(description);
    this.moviePosterUl = createElement({
      tagName: "ul",
      attrs: { class: "item-list" },
    });
    this.seeMoreButton = new createSeeMoreButton();
    this.addSeeMoreButtonEvent(posterType, movieName);
    this.element.append(this.moviePosterUl, this.seeMoreButton.element);
    this.seeMoreButton.element.click();
  }

  private addMoviePoster(movieInfos: MovieInfo[]) {
    const newMoviePosters = movieInfos.map(createMoviePoster);

    this.moviePosterUl.append(...newMoviePosters);
  }

  private notFoundMovie(movieName?: string) {
    this.element
      .querySelector("h2")
      ?.replaceChildren(movieName + " 그런 건 없어용!~ 🌞");
  }

  private createSectionElement(description: string) {
    const section = createElement({
      tagName: "section",
      attrs: { class: "item-view" },
    });
    const h2 = createElement({ tagName: "h2", contents: description });
    section.append(h2);

    return section;
  }

  private addSkeletonPosters(count: number) {
    this.moviePosterUl.append(...this.createSkeletons(count));
  }

  private deleteLastPosters(count: number) {
    Array.from({ length: count }).forEach(() =>
      this.moviePosterUl.lastChild?.remove()
    );
  }

  private createSkeletons(count: number) {
    return Array.from({ length: count }).map(createSkeletonMoviePoster);
  }

  private showNetworkFallbackComponent(
    posterType: MoviePosterType,
    movieName?: string
  ) {
    const networkErrorFallback = createNetworkFallback(posterType, movieName);
    $("body>section")?.remove();
    $("body")?.append(networkErrorFallback);
  }

  private fetchErrorHandler(posterType: MoviePosterType, movieName?: string) {
    return this.showNetworkFallbackComponent(posterType, movieName);
  }

  private createDescription(posterType: MoviePosterType, name?: string) {
    if (posterType === "search" && name) return `"${name}" 검색 결과`;
    return "지금 인기있는 영화";
  }

  private addSeeMoreButtonEvent(
    posterType: MoviePosterType,
    movieName?: string
  ) {
    this.seeMoreButton.element.addEventListener("click", () =>
      this.handleSeeMoreButton(posterType, movieName)
    );
  }

  private async handleSeeMoreButton(
    posterType: MoviePosterType,
    movieName?: string
  ) {
    try {
      this.addSkeletonPosters(numberOfPosters);
      const fetchedMovieInfo = await this.seeMoreButton.getMoreMoviePoster(
        posterType,
        movieName
      );
      this.deleteLastPosters(numberOfPosters);
      if (fetchedMovieInfo) this.addMoviePoster(fetchedMovieInfo);
      else this.notFoundMovie(movieName);
    } catch (error) {
      this.fetchErrorHandler(posterType, movieName);
    }
  }
}

export default MoviePosterBoard;
