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
    this.observeLastItem(callback);
  },

  async fetchMoreItems(callback: () => Promise<void>) {
    if (this.isLoading || this.allDataLoaded) return;

    this.isLoading = true;

    await callback();

    this.isLoading = false;
  },

  observeLastItem(callback: () => Promise<void>): void {
    const thumbnails = document.querySelectorAll(".item-thumbnail");
    const lastItem = thumbnails[thumbnails.length - 1] as HTMLElement;
    if (!lastItem) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.fetchMoreItems(callback);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(lastItem);
  },
};
