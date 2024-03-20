import "./style.css";

import createMoviePoster, { MovieInfo } from "../MoviePoster/createMoviePoster";
import { fetchPopularMovie, fetchTargetMovie } from "../../apis/fetchMovie";

import createButton from "../Button/createButton";
import createElement from "../../utils/createElement";
import createSkeletonMoviePoster from "../MoviePoster/createSkeletonMoviePoster";

type MoviePosterType = "popular" | "search";

class MoviePosterBoard {
  element;
  #ul: HTMLElement;
  #seeMoreButton;
  page: number;

  constructor(
    description: string,
    posterType: MoviePosterType,
    movieName?: string
  ) {
    this.page = 1;
    this.element = this.#createBasicElement(description);
    this.#ul = createElement("ul", { class: "item-list" });
    this.#seeMoreButton = this.#createSeeMoreButton(posterType, movieName);
    this.element.append(this.#ul, this.#seeMoreButton);
    this.#seeMoreButton.click();
  }

  addMoviePoster(movieInfos: MovieInfo[]) {
    const newMoviePosters = movieInfos.map(createMoviePoster);

    this.#ul.append(...newMoviePosters);
  }

  #createBasicElement(description: string) {
    const section = createElement("section", { class: "item-view" });
    const h2 = createElement("h2", {}, description);
    section.append(h2);

    return section;
  }

  #createSeeMoreButton(posterType: MoviePosterType, movieName?: string) {
    const seeMoreButton = createButton("더보기");

    seeMoreButton?.addEventListener(
      "click",
      this.#getSeeMoreButtonClickEvent(posterType, movieName).bind(this)
    );

    return seeMoreButton;
  }

  #addSkeletonPosters() {
    this.#ul.append(...this.#createSkeletons());
  }

  #deleteLast20Posters() {
    Array.from({ length: 20 }).forEach(() => this.#ul.lastChild?.remove());
  }

  #createSkeletons() {
    return Array.from({ length: 20 }).map(createSkeletonMoviePoster);
  }

  #getSeeMoreButtonClickEvent(posterType: MoviePosterType, movieName?: string) {
    return async (event: Event) => {
      this.#addSkeletonPosters();
      const fetchFunc =
        posterType === "popular" ? fetchPopularMovie : fetchTargetMovie;
      const TMDBResponse = await fetchFunc(this.page, movieName as string);
      if (!TMDBResponse) {
        throw new Error("에러발생");
      }
      this.#deleteLast20Posters();

      if (this.page === TMDBResponse?.total_pages)
        this.#seeMoreButton.classList.add("display-none");

      this.page++;
      const movieInfos = TMDBResponse.results.map((result) => {
        return {
          title: result.title,
          imgSrc: `https://image.tmdb.org/t/p/w220_and_h330_face/${result.poster_path}`,
          rating: result.vote_average,
        };
      });

      this.addMoviePoster(movieInfos);
      if (!this.#ul.children.length) {
        this.element
          .querySelector("h2")
          ?.replaceChildren(movieName + " 그런 건 없어용!~ 🌞");
      }
    };
  }
}

export default MoviePosterBoard;
