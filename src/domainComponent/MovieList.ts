import "./style.css";

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
  element = createElement("div", {
    attrs: {
      class: "movie-list",
      style: "padding-top:100px;",
    },
  });
  #title;
  #fetchFunc: () => Promise<{ movieInfos: MovieInfo[]; isLastPage: boolean }>;
  #moviePosterBoard;
  #posterBoardSkeleton = createMoviePosterBoardSkeleton();
  #seeMoreButton = this.#createSeeMoreButton();
  #networkFallBack = createNetworkFallback(
    this.#seeMoreButton.element.click.bind(this.#seeMoreButton.element)
  );
  #itemClickAction;

  #observer;
  #debounce: NodeJS.Timeout | null = null;

  constructor(
    title: string,
    fetchFunc: () => Promise<fetchPromiseT>,
    itemClickAction: (id: string) => void
  ) {
    this.#observer = this.#createObserver();
    this.#itemClickAction = itemClickAction;
    this.#moviePosterBoard = new MoviePosterBoard();
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
    revealElement(this.#seeMoreButton.element);

    hideElement(this.#networkFallBack);
  }

  #setFetchFunc(fetchFunc: () => Promise<fetchPromiseT>) {
    this.#fetchFunc = fetchFunc;
  }

  #setTitle(string: string) {
    this.#title.setTitle(string);
  }

  #createObserver() {
    const observer = new IntersectionObserver((e) => {
      this.#seeMoreButton.element.click.call(this.#seeMoreButton.element);
    });
    observer.observe(this.#seeMoreButton.element);

    return observer;
  }

  #createSeeMoreButton() {
    const seeMoreButton = new PrimaryButton({
      content: "더보기",
      type: "opacity-zero",
    });

    seeMoreButton.element.addEventListener(
      "click",
      this.#seeMoreButtonClickEvent.bind(this)
    );

    return seeMoreButton;
  }

  #attachSeeMoreButtonClickEvent() {
    this.#seeMoreButton.element.addEventListener(
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
    this.#dettachSeeMoreButtonClickEvent.call(this);
    revealElement(this.#posterBoardSkeleton);

    if (this.#debounce) {
      clearTimeout(this.#debounce);
    }

    this.#debounce = setTimeout(() => {
      hideElement(this.#seeMoreButton.element);
      this.#fetchFunc()
        .then(({ movieInfos, isLastPage }) => {
          this.#moviePosterBoard.addMoviePosters(
            movieInfos,
            this.#itemClickAction.bind(this.#itemClickAction)
          );

          if (isLastPage) {
            hideElement(this.#seeMoreButton.element);
            if (this.#moviePosterBoard.length === 0) {
              this.#title.setTitle("관련 영화가 존재하지 않습니다.");
            }
          } else revealElement(this.#seeMoreButton.element);

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
    }, 500);
  }
}

export default MovieList;
