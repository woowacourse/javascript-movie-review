import SkeletonUI from "../SkeletonUI";
import EventComponent from "./EventComponent";
import APIError from "../../error/APIError";
import { generateNetworkNotWorkingScreen } from "../templates/generateUnexpectedScreen";
import { $ } from "../../utils/dom";
import { runAsyncTryCatch } from "../../utils/runTryCatch";

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

  async init(): Promise<void> {
    this.skeletonUI.render(this.targetId);

    await runAsyncTryCatch<void, void>({
      tryBlock: this.composeUI.bind(this),
      catchBlock: this.handleError.bind(this),
    });
  }

  async fetchRenderData(): Promise<FetchedData> {
    throw new Error("fetch method must be implemented");
  }

  protected abstract override getTemplate(data?: FetchedData): string;

  protected abstract setEvent(): void;

  override render(data?: FetchedData): void {
    const element = $(this.targetId);

    if (!(element instanceof HTMLElement)) {
      return;
    }

    element.innerHTML = this.getTemplate(data);
  }

  private async composeUI(): Promise<void> {
    const data = await this.fetchRenderData();
    this.render(data);
    this.setEvent();
  }

  private handleError(error: unknown): void {
    if (error instanceof APIError) {
      alert(error.message);
    } else if (error instanceof Error) {
      alert(
        "네트워크가 원활하지 않습니다. 인터넷 연결 확인 후 다시 시도해주세요."
      );
    }

    const errorTargetElement = $(this.targetId);
    if (errorTargetElement instanceof HTMLElement) {
      errorTargetElement.innerHTML = generateNetworkNotWorkingScreen();
    }
  }
}
