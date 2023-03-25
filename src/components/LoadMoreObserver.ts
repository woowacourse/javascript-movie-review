import EventDispatcher from '../EventDispatcher';

class LoadMoreObserver {
  private $observer;

  constructor() {
    this.$observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.intersectionRatio > 0 && EventDispatcher.dispatchEvent('loadMoreItems');
      });
    });
  }

  selectObservingElement(element: HTMLElement) {
    this.$observer.disconnect();
    this.$observer.observe(element);
  }
}

export default LoadMoreObserver;
