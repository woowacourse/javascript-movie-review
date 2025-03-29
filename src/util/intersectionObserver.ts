type ObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
};

export function createInfiniteScrollObserver(
  target: Element,
  callback: () => void,
  options: ObserverOptions = { root: null, threshold: 0.5 }
): IntersectionObserver {
  const observer = new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) {
      callback();
    }
  }, options);

  observer.observe(target);
  return observer;
}
