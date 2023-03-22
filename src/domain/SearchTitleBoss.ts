import { CustomElement } from "../type/componentType";

class SearchTitleBoss {
  private subscriber: CustomElement | undefined;

  subscribe(element: CustomElement) {
    this.subscriber = element;
  }

  publish(searchWord: string) {
    if (this.subscriber) this.subscriber.rerender(searchWord);
  }
}

export default new SearchTitleBoss();
