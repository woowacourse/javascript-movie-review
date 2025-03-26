class UIManager {
  #isLoading = false;
  #showMoreButton = true;
  #isModalOpen = true;

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

  setIsModalOpen(isOpen: boolean) {
    this.#isModalOpen = isOpen;
  }
  getIsModalOpen() {
    return this.#isModalOpen;
  }
}

export default UIManager;
