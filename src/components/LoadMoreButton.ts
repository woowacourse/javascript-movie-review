import { $ } from '../utils/domSelector';
import EventBroker from '../EventBroker';
class LoadMoreButton {
  private name = 'Load More';

  getTemplate() {
    return `
      <button type="submit" id="load-more-button" class="btn primary full-width">
        ${this.name}
      </button>`;
  }

  enable() {
    const $loadMoreButton = $<HTMLButtonElement>('#load-more-button');

    $loadMoreButton.disabled = false;
    $loadMoreButton.textContent = this.name;
  }

  disable() {
    const $loadMoreButton = $<HTMLButtonElement>('#load-more-button');

    $loadMoreButton.disabled = true;
    $loadMoreButton.textContent = 'There are no more movies to load.';
  }

  addClickEventHandler() {
    const $loadMoreButton = $<HTMLButtonElement>('#load-more-button');

    $loadMoreButton.addEventListener('click', () => {
      EventBroker.dispatchEvent(new CustomEvent('appendMovieListEvent'));
    });
  }
}

export default LoadMoreButton;
