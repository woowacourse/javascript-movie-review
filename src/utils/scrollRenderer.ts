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
    callback: (observer: IntersectionObserver) => Promise<void>
  ): IntersectionObserverCallback {
    return (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(observer);
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
