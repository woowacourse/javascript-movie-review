import { reserveIntersectionHandler } from "../utils/intersectionObserver";
import {
  getBackgroundContainerElement,
  getLoadMoreInViewElement,
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
  const loadMoreInView = getLoadMoreInViewElement();
  if (!loadMoreInView) return;

  let isLoading = false;

  return reserveIntersectionHandler(
    loadMoreInView,
    async ({ isIntersecting }) => {
      if (loadMoreInView && isIntersecting && !isLoading) {
        isLoading = true;
        await callback();
        isLoading = false;
      }
    },
  );
};
