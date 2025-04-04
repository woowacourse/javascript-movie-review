class MovieListScrollManager {
  #onScroll: () => void;

  constructor(onScroll: () => void) {
    this.#onScroll = onScroll;
  }

  bind() {
    window.addEventListener("scroll", this.#onScroll);
  }

  unbind() {
    window.removeEventListener("scroll", this.#onScroll);
  }

  static isNearBottom(): boolean {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
  }
}

export default MovieListScrollManager;
