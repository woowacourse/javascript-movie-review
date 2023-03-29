import { CustomElement } from "../type/componentType";

class SearchTitleProcess {
  private subscriber: CustomElement | undefined;

  subscribe(element: CustomElement) {
    this.subscriber = element;
  }

  publish(searchWord: string) {
    if (this.subscriber) this.subscriber.rerender(searchWord);
  }
}

export default new SearchTitleProcess();
