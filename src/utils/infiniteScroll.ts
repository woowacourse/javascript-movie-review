import { $, $$ } from "./selector";

export const loadDataByInfiniteScroll = async (
  target: HTMLElement,
  renderMovies: () => void
) => {
  const callback = async (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    const observerTarget = entries[0];

    if (!observerTarget.isIntersecting) return;
    if (observerTarget.isIntersecting) {
      observer.unobserve(target);
    }

    if ($$(".item-card").length >= 20) {
      const currentTitle = $("h2") as HTMLElement;
      currentTitle.remove();
      await renderMovies();
      observer.observe(target);
    }
  };

  const observer = new IntersectionObserver(callback);
  observer.observe(target);
  return observer;
};
