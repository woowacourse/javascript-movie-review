export class InfiniteScrollView {
  #sentinel;
  #observer;

  constructor(getObserver: () => IntersectionObserver) {
    this.#sentinel = document.querySelector("#sentinel");
    this.#observer = getObserver();
  }

  start() {
    if (!this.#sentinel) return;

    this.#observer.observe(this.#sentinel);
  }

  stop() {
    this.#observer.disconnect();
  }
}
