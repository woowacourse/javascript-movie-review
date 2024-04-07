import { $ } from '../utils/domUtils';
import MovieListController from './MovieListController';

class InfiniteScrollController {
  private static callback: IntersectionObserverCallback = (entries) => {
    const lastEntry = entries[0];

    if (lastEntry.isIntersecting) {
      MovieListController.moreLoadMovieList();
      this.observer.unobserve(lastEntry.target);
    }
  };

  private static observer = new IntersectionObserver(this.callback);

  public static initObserveTarget() {
    this.observer.observe($('.item-list li:last-child')!);
  }
}

export default InfiniteScrollController;
