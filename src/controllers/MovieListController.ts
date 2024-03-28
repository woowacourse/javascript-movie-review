import { MovieInfo } from "../components/MoviePoster/createMoviePreview";
import MoviePosterBoard from "../components/MoviePosterBoard/MoviePosterBoard";
import PrimaryButton from "../components/Button/createPrimaryButton";
import createElement from "../utils/createElement";
import createMoviePosterBoardSkeleton from "../components/MoviePosterBoard/createMoviePosterBoardSkeleton";
import createNetworkFallback from "../components/NetworkErrorFallBack/createNetworkErrorFallback";

interface fetchPromiseT {
  movieInfos: MovieInfo[];
  isLastPage: boolean;
}
class MovieListController {
  element = createElement("div");
  #title = document.createElement("h2");
  #fetchFunc: () => Promise<{ movieInfos: MovieInfo[]; isLastPage: boolean }>;
  #moviePosterBoard = new MoviePosterBoard();
  #posterBoardSkeleton = createMoviePosterBoardSkeleton();
  #seeMoreButton = this.#createSeeMoreButton();
  #networkFallBack = createNetworkFallback(
    this.#seeMoreButton.element.click.bind(this.#seeMoreButton.element)
  );

  constructor(title: string, fetchFunc: () => Promise<fetchPromiseT>) {
    const section = createElement("section", { attrs: { class: "item-view" } });
    section.append(
      this.#title,
      this.#moviePosterBoard.element,
      this.#posterBoardSkeleton,
      this.#seeMoreButton.element
    );

    this.element.append(section, this.#networkFallBack);
    this.#title.textContent = title;
    this.#fetchFunc = fetchFunc;
    this.render();
  }

  #setFetchFunc(fetchFunc: () => Promise<fetchPromiseT>) {
    this.#fetchFunc = fetchFunc;
  }

  #setTitle(string: string) {
    this.#title.textContent = string;
  }

  render(option?: {
    title?: string;
    fetchFunc?: () => Promise<fetchPromiseT>;
  }) {
    const { title, fetchFunc } = option ?? {};
    if (title) this.#setTitle(title);
    if (fetchFunc) this.#setFetchFunc(fetchFunc);

    this.#moviePosterBoard.deleteMoviePosters();
    this.#showSeeMoreButton();
    this.#seeMoreButton.element.click();

    this.#hideNetworkFallBack();
  }
  #hideNetworkFallBack() {
    this.#networkFallBack.classList.add("visibility-hidden-no-position");
  }

  #showNetworkFallBack() {
    this.#networkFallBack.classList.remove("visibility-hidden-no-position");
  }

  #hidePosterBoardSkeleton() {
    this.#posterBoardSkeleton.classList.add("visibility-hidden-no-position");
  }

  #showPosterBoardSkeleton() {
    this.#posterBoardSkeleton.classList.remove("visibility-hidden-no-position");
  }

  #hideSeeMoreButton() {
    this.#seeMoreButton.element.classList.add("visibility-hidden-no-position");
  }

  #showSeeMoreButton() {
    this.#seeMoreButton.element.classList.remove(
      "visibility-hidden-no-position"
    );
  }

  #createSeeMoreButton() {
    const seeMoreButton = new PrimaryButton({ content: "더보기" });

    seeMoreButton.element.addEventListener(
      "click",
      this.#seeMoreButtonClickEvent.bind(this)
    );

    return seeMoreButton;
  }

  #seeMoreButtonClickEvent() {
    this.#showPosterBoardSkeleton();

    this.#fetchFunc()
      .then(({ movieInfos, isLastPage }) => {
        this.#moviePosterBoard.addMoviePosters(movieInfos);

        if (isLastPage) this.#hideSeeMoreButton.bind(this)();
        else this.#showSeeMoreButton();

        this.#hideNetworkFallBack.bind(this)();
      })
      .catch(() => {
        this.#showNetworkFallBack.bind(this)();
        this.#hideSeeMoreButton.bind(this)();
      })
      .finally(() => {
        this.#hidePosterBoardSkeleton.bind(this)();
      });
  }
}

export default MovieListController;
