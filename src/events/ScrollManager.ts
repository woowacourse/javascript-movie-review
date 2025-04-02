class ScrollManeger {
  private readonly threshold: number;
  private readonly callback: () => void;
  private readonly onScroll: () => void;

  constructor(callback: () => void, threshold = 150) {
    this.callback = callback;
    this.threshold = threshold;
    this.onScroll = () => this.handleScroll();
  }

  private handleScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - this.threshold) {
      this.callback();
    }
  }

  start() {
    window.addEventListener("scroll", this.onScroll);
  }

  stop() {
    window.removeEventListener("scroll", this.onScroll);
  }
}

export default ScrollManeger;
