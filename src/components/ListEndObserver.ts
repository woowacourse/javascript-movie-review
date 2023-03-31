import { CAPTION } from '../constants';
import EventBroker from '../EventBroker';

const options = {
  root: null,
  threshold: 0.1,
};

class ListEndObserver {
  constructor(target: HTMLElement) {
    this.observer.observe(target);
  }

  observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.textContent === CAPTION.LAST_PAGE) return;

      EventBroker.dispatchEvent(new CustomEvent('appendMovieListEvent'));
    });
  }, options);
}

export default ListEndObserver;
