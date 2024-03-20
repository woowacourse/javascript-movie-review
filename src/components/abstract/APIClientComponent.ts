import { $ } from "../../utils/dom";
import EventComponent from "./EventComponent";

type FetchedData = Record<any, any> | Record<any, any>[];

export default abstract class APIClientComponent extends EventComponent {
  async init() {
    const data = await this.fetchInitialData();
    this.render(data);
    this.setEvent();
  }

  async fetchInitialData(): Promise<FetchedData> {
    throw new Error("fetch method must be implemented");
  }

  override render(data?: FetchedData) {
    const element = $(this.targetId);

    if (!element) {
      return;
    }

    element.innerHTML = this.getTemplate(data);
  }

  abstract override getTemplate(data?: FetchedData): string;

  abstract setEvent(): void;
}
