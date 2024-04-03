import { InfiniteScrollParams } from '../interface/InfiniteScrollInterface';

export default class InfiniteScroll {
  private observer: IntersectionObserver;
  private callbackFunction: () => void;
  private sentryElement: HTMLDivElement;

  constructor({ targetElement, callbackFunction, options }: InfiniteScrollParams) {
    this.callbackFunction = callbackFunction;
    this.sentryElement = document.createElement('div');
    this.sentryElement.classList.add('infinite-scroll-sentry');
    targetElement.appendChild(this.sentryElement);

    if (options) {
      this.observer = new IntersectionObserver(this.handleObserver.bind(this), options);
    } else {
      this.observer = new IntersectionObserver(this.handleObserver.bind(this), {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      });
    }
  }

  private handleObserver(entries: IntersectionObserverEntry[]) {
    const target = entries[0];
    if (target.isIntersecting) {
      this.disconnect();
      this.callbackFunction();
    }
  }

  connect() {
    if (this.sentryElement) {
      this.observer.observe(this.sentryElement);
    }
  }

  disconnect() {
    if (this.sentryElement) {
      this.observer.unobserve(this.sentryElement);
    }
  }
}
