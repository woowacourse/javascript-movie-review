export class InfiniteScroll {
  private readonly observer: IntersectionObserver;

  constructor(
    private readonly sentinel: HTMLElement,
    onIntersect: () => void,
  ) {
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { rootMargin: "200px" },
    );
  }

  observe(): void {
    this.observer.observe(this.sentinel);
  }

  disconnect(): void {
    this.observer.disconnect();
  }
}