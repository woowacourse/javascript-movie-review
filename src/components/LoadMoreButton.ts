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

  changeStateAccordingTo(isLastPage: boolean) {
    const $loadMoreButton = $<HTMLButtonElement>('#load-more-button');

    $loadMoreButton.disabled = isLastPage ? true : false;
    $loadMoreButton.textContent = isLastPage ? 'There are no more movies to load.' : this.name;
  }

  addClickEventHandler() {
    const $loadMoreButton = $<HTMLButtonElement>('#load-more-button');

    $loadMoreButton.addEventListener('click', () => {
      EventBroker.dispatchEvent(new CustomEvent('appendMovieListEvent'));
    });
  }
}

export default LoadMoreButton;
