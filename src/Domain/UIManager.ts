class UIManager {
  #isLoading = false;
  #isModalOpen = true;
  #hasMore = true;

  reset() {
    this.#isLoading = false;
    this.#hasMore = true;
  }

  setLoading(isLoading: boolean) {
    this.#isLoading = isLoading;
  }
  getLoading() {
    return this.#isLoading;
  }

  setHasMore(show: boolean) {
    this.#hasMore = show;
  }
  getHasMore() {
    return this.#hasMore;
  }

  setIsModalOpen(isOpen: boolean) {
    this.#isModalOpen = isOpen;
  }
  getIsModalOpen() {
    return this.#isModalOpen;
  }
}

export default UIManager;
