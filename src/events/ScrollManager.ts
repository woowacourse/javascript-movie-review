class ScrollManager {
  private readonly callback: () => void;
  private readonly threshold: number;
  private readonly target: HTMLElement;
  private observer: IntersectionObserver | null = null;

  constructor({
    target,
    callback,
    threshold = 150,
  }: {
    target: HTMLElement;
    callback: () => void;
    threshold?: number;
  }) {
    this.target = target;
    this.callback = callback;
    this.threshold = threshold;
  }

  start() {
    if (this.observer) return; // 중복 방지

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.callback();
          }
        });
      },
      {
        root: null,
        rootMargin: `0px 0px ${this.threshold}px 0px`, //
        threshold: 0,
      }
    );

    this.observer.observe(this.target);
  }

  stop() {
    if (this.observer && this.target) {
      this.observer.unobserve(this.target);
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

export default ScrollManager;
