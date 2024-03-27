// 스크롤을 아주 빠르게 내릴 시, 중간에 observe가 감지 못해서인지 감지되는 요소가 보임에도 추가적인 데이터가 생성되지 않는 문제 발견.
export class InfiniteScroll {
  private observe: IntersectionObserver | null = null;
  private target: HTMLElement;
  private isLoading: boolean;
  private callback: (observe: InfiniteScroll) => Promise<void>;

  constructor(target: HTMLElement, callback: (observe: InfiniteScroll) => Promise<void>) {
    this.target = target;
    this.isLoading = false;
    this.callback = callback;
  }
  observeIntersection() {
    this.observe = new IntersectionObserver(async entries => {
      entries.forEach(async entry => {
        if (entry.isIntersecting && !this.isLoading) {
          this.target.textContent = '로딩중';
          this.isLoading = true;
          setTimeout(async () => {
            await this.callback(this).then(() => {
              this.target.textContent = '';
              this.isLoading = false;
            });
          }, 150);
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
