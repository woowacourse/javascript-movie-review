import MovieApp from '../MovieApp';
import { RenderInputType } from '../types/props';

interface ObservingType extends RenderInputType {
  threshold: number;
}

const infiniteScroll = {
  startObserving(movieApp: MovieApp, { renderType, input, threshold }: ObservingType) {
    if (movieApp.categorizeRenderType(renderType).isLastPage) return;
    const scrollEnd = document.querySelector('#scroll-end-box');
    if (scrollEnd) {
      const options = {
        threshold,
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
