import { $ } from '../utils/domSelector';

class LoadMoreButton {
  #name = 'Load More';

  getTemplate() {
    return `
      <button type="submit" id="load-more-button" class="btn primary full-width">
        ${this.#name}
      </button>`;
  }

  enable() {
    const $loadMoreButton = $<HTMLButtonElement>('#load-more-button');

    $loadMoreButton.disabled = false;
    $loadMoreButton.textContent = this.#name;
  }

  disable() {
    const $loadMoreButton = $<HTMLButtonElement>('#load-more-button');

    $loadMoreButton.disabled = true;
    $loadMoreButton.textContent = 'There are no more movies to load.';
  }

  addClickEventHandler(onClickLoadMoreButton: () => void) {
    const $loadMoreButton = $<HTMLButtonElement>('#load-more-button');

    $loadMoreButton.addEventListener('click', () => {
      onClickLoadMoreButton();
    });
  }
}

export default LoadMoreButton;
