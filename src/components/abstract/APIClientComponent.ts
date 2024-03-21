import { $ } from "../../utils/dom";
import SkeletonUI from "../SkeletonUI";
import EventComponent from "./EventComponent";

type FetchedData = Record<any, any> | Record<any, any>[];

interface APIClientComponentProps {
  targetId: string;
  skeletonUI: SkeletonUI;
}
export default abstract class APIClientComponent extends EventComponent {
  protected skeletonUI: SkeletonUI;

  constructor({ targetId, skeletonUI }: APIClientComponentProps) {
    super({ targetId });
    this.skeletonUI = skeletonUI;
  }

  async init() {
    this.skeletonUI.render(this.targetId);
    const data = await this.fetchInitialData();
    this.render(data);
    this.setEvent();
  }

  async fetchInitialData(): Promise<FetchedData> {
    throw new Error("fetch method must be implemented");
  }

  abstract override getTemplate(data?: FetchedData): string;

  abstract setEvent(): void;

  override render(data?: FetchedData) {
    const element = $(this.targetId);

    if (!(element instanceof HTMLElement)) {
      return;
    }

    element.innerHTML = this.getTemplate(data);
  }
}
