let observer: IntersectionObserver | null = null;

export const initObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
) => {
  if (!observer) {
    observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: '100px',
      threshold: 1.0,
    });
  }
};

export const observeTarget = (target: Element) => {
  if (!observer) return;

  observer.disconnect();
  observer.observe(target);
};
