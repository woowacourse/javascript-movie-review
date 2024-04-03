import './style.css';

class MoreSpace {
  private template: HTMLDivElement;

  private observer: IntersectionObserver;

  constructor(callback: () => void) {
    this.template = this.createElement();
    this.observer = this.setObserver(callback);
    this.observeMoreSpace();
  }

  private createElement() {
    const moreSpace = document.createElement('div');
    moreSpace.className = 'more-space';
    moreSpace.textContent = '더 보여줄거지롱';
    return moreSpace;
  }

  get element() {
    return this.template;
  }

  private setObserver(callback: () => void) {
    const observer = new IntersectionObserver(
      (entries) => this.observerCallback.call(this, entries, callback),
      {
        threshold: 0.5,
      },
    );
    return observer;
  }

  private observerCallback(entries: IntersectionObserverEntry[], callback: () => void) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.unObservedMoreSpace();
        callback();
        this.afterIsIntersecting();
      }
    });
  }

  private afterIsIntersecting() {
    const fallback = document.querySelector('.fallback');
    if (fallback === null) {
      this.observeMoreSpace();
    }
  }

  observeMoreSpace() {
    this.observer.observe(this.template);
  }

  unObservedMoreSpace() {
    this.observer.unobserve(this.template);
  }
}

export default MoreSpace;
