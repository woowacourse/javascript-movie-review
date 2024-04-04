interface InfiniteScrollData {
  target: HTMLElement;
  callback: (observe: InfiniteScroll) => Promise<void>;
  observerInterval?: number;
  loadingMessage?: string;
}
export class InfiniteScroll {
  private observe: IntersectionObserver | null = null;
  private target: HTMLElement;
  private isLoading: boolean;
  private callback: (observe: InfiniteScroll) => Promise<void>;
  private loadingMessage: string | null;
  private observerInterval;

  constructor({ target, callback, observerInterval = 150, loadingMessage }: InfiniteScrollData) {
    this.target = target;
    this.isLoading = false;
    this.callback = callback;
    this.observerInterval = observerInterval;
    this.loadingMessage = loadingMessage ?? null;
  }
  observeIntersection() {
    this.observe = new IntersectionObserver(async entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting && !this.isLoading) {
          if (!!this.loadingMessage) this.target.textContent = this.loadingMessage;
          this.isLoading = true;
          setTimeout(async () => {
            await this.callback(this).then(() => {
              this.target.textContent = '';
              this.isLoading = false;
            });
          }, this.observerInterval);
        }
      });
    });
    this.observe.observe(this.target);
  }

  unobserve() {
    if (this.observe) {
      this.observe.unobserve(this.target);
    }
  }
}

export default InfiniteScroll;
