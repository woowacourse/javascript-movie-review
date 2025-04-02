import { isHTMLElement } from "../../../utils/typeGuards";

export class InfiniteScrollManager {
  private observer: IntersectionObserver | null = null;
  private sentinel: HTMLDivElement;

  constructor(private parent: HTMLElement, private onIntersect: () => void) {
    this.sentinel = document.createElement("div");
    this.sentinel.className = "scroll-sentinel";
    this.parent.appendChild(this.sentinel);
    this.initObserver();
  }

  private initObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.onIntersect();
        }
      });
    });
    this.observer.observe(this.sentinel);
  }

  public disconnect(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (isHTMLElement(this.sentinel)) {
      this.sentinel.remove();
    }
  }
}
