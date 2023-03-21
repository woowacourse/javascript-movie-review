import EventBus from '../EventBus';

class LoadMoreObserver {
  private $observer!: IntersectionObserver;

  constructor() {
    this.setObserver();
  }

  private setObserver() {
    this.$observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.intersectionRatio > 0 && EventBus.triggerEvent('loadMoreItems');
      });
    });
  }

  selectObservingElement(element: HTMLElement) {
    this.$observer.disconnect();
    this.$observer.observe(element);
  }
}

export default LoadMoreObserver;
