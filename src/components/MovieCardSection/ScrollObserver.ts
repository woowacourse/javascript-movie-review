import MovieCardSection from '.';

import movieStates from '../../states/movies';
import { $ } from '../../utils/dom';

const ScrollObserver = {
  template() {
    return `
      <div id="scroll-observer"></div>
    `;
  },

  createObserver() {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    return new IntersectionObserver(ScrollObserver.handleIntersect, options);
  },

  connect(observer: IntersectionObserver) {
    observer.observe($<HTMLDivElement>('#scroll-observer'));
  },

  handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && movieStates.isPageInRange()) {
        MovieCardSection.render(movieStates.getQuery());
      }

      if (!movieStates.isPageInRange()) {
        observer.disconnect();
      }
    });
  },
};

export default ScrollObserver;
