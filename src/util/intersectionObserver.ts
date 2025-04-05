type ObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

export function createInfiniteScrollObserver(
  target: Element,
  callback: () => void,
  options: ObserverOptions = { root: null, threshold: 1 }
): IntersectionObserver {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      callback();
    }
  }, options);

  observer.observe(target);
  return observer;
}
