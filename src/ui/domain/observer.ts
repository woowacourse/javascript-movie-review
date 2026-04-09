import { reserveIntersectionHandler } from "../utils/intersectionObserver";
import {
  getBackgroundContainerElement,
  getTopRatedMovieElement,
} from "./movieElement";

export const observeHeaderScroll = () => {
  // 배너영역을 기준으로 헤더의 background 색상이 변경된다.
  const topRatedMovie = getTopRatedMovieElement();
  const backgroundContainer = getBackgroundContainerElement();
  if (topRatedMovie && backgroundContainer) {
    reserveIntersectionHandler(topRatedMovie, ({ isIntersecting }) => {
      backgroundContainer.classList.toggle("scrolled", !isIntersecting);
    });
  }
};

export const observeLoadMoreScroll = (callback: () => Promise<void>) => {
  const loadMoreInView =
    document.querySelector<HTMLDivElement>(".load-more-inView"); //TODO: 계층화 필요
  if (!loadMoreInView) return;

  let isLoading = false;

  return reserveIntersectionHandler(
    loadMoreInView,
    async ({ isIntersecting }) => {
      const loadMoreButton = document.querySelector(".load-more-inView");
      if (loadMoreButton && isIntersecting && !isLoading) {
        isLoading = true;
        await callback();
        isLoading = false;
      }
    },
  );
};
