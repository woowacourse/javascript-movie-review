import MovieApp from '../MovieApp';
import INFINITE_SCROLL from '../constants/infiniteScroll';
import { RenderInputType } from '../types/props';

const infiniteScroll = {
  startObserving(movieApp: MovieApp, { renderType, input }: RenderInputType) {
    if (movieApp.categorizeRenderType(renderType).isLastPage) return;
    const scrollEnd = document.querySelector('#scroll-end-box');
    if (scrollEnd) {
      const options = {
        threshold: INFINITE_SCROLL.THRESHOLD,
      };

      const observers = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (movieApp.categorizeRenderType(renderType).isLastPage) observer.disconnect();
          if (!entry.isIntersecting || movieApp.categorizeRenderType(renderType).isLoading) return;
          observer.observe(scrollEnd);
          movieApp.handleMovieApp({ renderType, input });
        });
      }, options);

      observers.observe(scrollEnd);
    }
  },
};

export default infiniteScroll;
