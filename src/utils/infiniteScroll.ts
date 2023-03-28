export const loadDataByInfiniteScroll = async (
  target: HTMLElement,
  renderMovies: () => boolean
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

    renderMovies() && observer.observe(target);
  };

  const observer = new IntersectionObserver(callback);
  observer.observe(target);
  return observer;
};
