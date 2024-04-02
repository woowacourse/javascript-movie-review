import MovieApp from '../MovieApp';
import { RenderInputType } from '../types/props';

const infiniteScroll = {
  startObserving(movieApp: MovieApp, { renderType, input }: RenderInputType) {
    const scrollEnd = document.querySelector('#scroll-end-box');
    if (scrollEnd) {
      const options = {
        threshold: 1.0,
      };

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (movieApp.categorizeRenderType(renderType).isLastPage) observer.disconnect();
          if (!entry.isIntersecting || movieApp.isLoading) return;

          observer.observe(scrollEnd);
          this.handleMovieApp(movieApp, { renderType, input });
        });
      }, options);

      observer.observe(scrollEnd);
    }
  },

  handleMovieApp(movieApp: MovieApp, { renderType, input }: RenderInputType) {
    movieApp.categorizeRenderType(renderType).updatePage();
    movieApp.renderMainContents({ renderType, input });
  },
};

export default infiniteScroll;
