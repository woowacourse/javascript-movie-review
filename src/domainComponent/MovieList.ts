import { MovieInfo } from "../components/MoviePreview/createMoviePreview";
import MoviePosterBoard from "../components/MoviePosterBoard/MoviePosterBoard";
import PrimaryButton from "../components/Button/createPrimaryButton";
import SubTitle from "../components/SubTitle/SubTitle";
import createElement from "../utils/createElement";
import createMoviePosterBoardSkeleton from "../components/MoviePosterBoard/createMoviePosterBoardSkeleton";
import createNetworkFallback from "../components/NetworkErrorFallBack/createNetworkErrorFallback";
import hideElement from "./utils/hideElement";
import revealElement from "./utils/revealElement";

interface fetchPromiseT {
  movieInfos: MovieInfo[];
  isLastPage: boolean;
}
class MovieList {
  element = createElement("div");
  #title;
  #fetchFunc: () => Promise<{ movieInfos: MovieInfo[]; isLastPage: boolean }>;
  #moviePosterBoard = new MoviePosterBoard();
  #posterBoardSkeleton = createMoviePosterBoardSkeleton();
  #seeMoreButton = this.#createSeeMoreButton();
  #networkFallBack = createNetworkFallback(
    this.#seeMoreButton.element.click.bind(this.#seeMoreButton.element)
  );

  constructor(title: string, fetchFunc: () => Promise<fetchPromiseT>) {
    const section = createElement("section", { attrs: { class: "item-view" } });
    this.#title = new SubTitle(title);
    section.append(
      this.#title.element,
      this.#moviePosterBoard.element,
      this.#posterBoardSkeleton,
      this.#seeMoreButton.element
    );

    this.element.append(section, this.#networkFallBack);
    this.#fetchFunc = fetchFunc;
    this.init();
  }

  init(option?: { title?: string; fetchFunc?: () => Promise<fetchPromiseT> }) {
    const { title, fetchFunc } = option ?? {};
    if (title) this.#setTitle(title);
    if (fetchFunc) this.#setFetchFunc(fetchFunc);

    this.#moviePosterBoard.deleteMoviePosters();
    hideElement(this.#seeMoreButton.element);
    this.#seeMoreButton.element.click();

    hideElement(this.#networkFallBack);
  }

  #setFetchFunc(fetchFunc: () => Promise<fetchPromiseT>) {
    this.#fetchFunc = fetchFunc;
  }

  #setTitle(string: string) {
    this.#title.setTitle(string);
  }

  #createSeeMoreButton() {
    const seeMoreButton = new PrimaryButton({ content: "더보기" });

    seeMoreButton.element.addEventListener(
      "click",
      this.#seeMoreButtonClickEvent.bind(this)
    );

    return seeMoreButton;
  }

  #attachSeeMoreButtonClickEvent() {
    this.#seeMoreButton.element.removeEventListener(
      "click",
      this.#seeMoreButtonClickEvent
    );
  }

  #dettachSeeMoreButtonClickEvent() {
    this.#seeMoreButton.element.removeEventListener(
      "click",
      this.#seeMoreButtonClickEvent
    );
  }

  #seeMoreButtonClickEvent(event: Event) {
    revealElement(this.#posterBoardSkeleton);
    this.#dettachSeeMoreButtonClickEvent.call(this);

    this.#fetchFunc()
      .then(({ movieInfos, isLastPage }) => {
        this.#moviePosterBoard.addMoviePosters(movieInfos);

        if (isLastPage) hideElement(this.#seeMoreButton.element);
        else revealElement(this.#seeMoreButton.element);

        hideElement(this.#networkFallBack);
      })
      .catch(() => {
        revealElement(this.#networkFallBack);
        hideElement(this.#seeMoreButton.element);
      })
      .finally(() => {
        hideElement(this.#posterBoardSkeleton);
        this.#attachSeeMoreButtonClickEvent();
      });
  }
}

export default MovieList;
