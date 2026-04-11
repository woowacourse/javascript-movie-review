import { isLastPage } from "../api/isLastPage";

class InfiniteScrollView {
  #options: IntersectionObserverInit;
  #observer: IntersectionObserver;
  #handler: (() => void) | null = null;
  #callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("target");
        observer.unobserve(entry.target);

        if (this.#handler) this.#handler();
      }
    })
  };

  constructor(options?: IntersectionObserverInit) {
    this.#options = options || {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    this.#observer = new IntersectionObserver(this.#callback, this.#options);
  };

  bindBottomIntersect(handler: () => void) {
    this.#handler = handler;
  };

  observe() {
    const lastMovieList  = document.querySelector<HTMLLIElement>(".thumbnail-list li:last-child");;

    if (lastMovieList) {
      this.#observer.observe(lastMovieList);
    };
  };

  disconnect() {
    this.#observer.disconnect();
  };

  updateObserver(data: MovieResponse) {
    if (isLastPage(data)) {
      infiniteScrollView.disconnect();
    } else {
      infiniteScrollView.observe();
    };
  };
};

export const infiniteScrollView = new InfiniteScrollView({ threshold: 1.0 });
