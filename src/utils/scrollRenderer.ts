import MovieList from "../components/MovieList.ts";
import { selectElement } from "./ui.ts";

class ScrollRenderer {
  static #instance: ScrollRenderer;

  static getInstance(): ScrollRenderer {
    if (!ScrollRenderer.#instance) {
      ScrollRenderer.#instance = new ScrollRenderer();
    }

    return ScrollRenderer.#instance;
  }

  createObserverCallback(
    fetch: (
      movieList: MovieList,
      observer: IntersectionObserver,
      scrollRenderer: ScrollRenderer
    ) => Promise<void>,
    movieList: MovieList
  ): IntersectionObserverCallback {
    return (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetch(movieList, observer, ScrollRenderer.getInstance());
          observer.unobserve(entry.target);
        }
      });
    };
  }

  setNewObservingTarget(observer: IntersectionObserver, selector: string) {
    const newTarget = selectElement(selector);
    if (newTarget) {
      observer.observe(newTarget);
    }
  }
}

export default ScrollRenderer;
