class UIManager {
  #isLoading = false;
  #showMoreButton = true;

  reset() {
    this.#isLoading = false;
    this.#showMoreButton = true;
  }

  setLoading(isLoading: boolean) {
    this.#isLoading = isLoading;
  }
  getLoading() {
    return this.#isLoading;
  }

  setShowMore(show: boolean) {
    this.#showMoreButton = show;
  }
  getShowMore() {
    return this.#showMoreButton;
  }
}

export default UIManager;
