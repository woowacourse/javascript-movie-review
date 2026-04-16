class InfiniteScrollObserver {
  #observer: IntersectionObserver;

  constructor(target: Element, onIntersect: () => Promise<void>) {
    this.#observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        await onIntersect();
      },
      { root: null, threshold: 0.2 },
    );

    this.#observer.observe(target);
  }
}

export default InfiniteScrollObserver;
