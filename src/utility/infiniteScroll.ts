import { $, createElement } from "./dom";

export const infiniteScroll = {
  isLoading: false,
  allDataLoaded: false,

  addScrollAnchorDiv() {
    const scrollAnchorDiv = createElement("div", { class: "scroll-anchor" });
    scrollAnchorDiv.style.height = "1px";

    $(".item-view")?.appendChild(scrollAnchorDiv);
  },

  async addInfiniteScroll(callback: () => Promise<void>) {
    this.addScrollAnchorDiv();
    this.observeLastItem(callback);
  },

  async fetchMoreItems(callback: () => Promise<void>) {
    if (this.isLoading || this.allDataLoaded) return;

    this.isLoading = true;

    await callback();

    this.isLoading = false;
  },

  observeLastItem(callback: () => Promise<void>): void {
    const scrollAnchor = document.querySelector(".scroll-anchor");
    if (!scrollAnchor) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.fetchMoreItems(callback);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(scrollAnchor);
  },
};
