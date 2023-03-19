import { CustomElement } from "../type/componentType";

class SearchTitleStore {
  private searchTitleSubscribers: CustomElement | undefined;

  subscribeSearchTitle(element: CustomElement) {
    this.searchTitleSubscribers = element;
  }

  publish(searchWord: string) {
    if (this.searchTitleSubscribers)
      this.searchTitleSubscribers.rerender(searchWord);
  }
}

export default new SearchTitleStore();
