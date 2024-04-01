interface Props {
  target: HTMLElement;
  callback: Function;
  options?: IntersectionObserverOptions;
}

interface IntersectionObserverOptions {
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: number | number[];
}

class ObserveIntersection {
  private observer;
  constructor({ target, callback, options }: Props) {
    this.observer = this.registeredObserver({ target, callback, options });
  }

  registeredObserver({ target, callback, options }: Props) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, options);

    observer.observe(target);
    return observer;
  }

  clearObserveIntersection() {
    this.observer.disconnect();
  }
}

export default ObserveIntersection;
