import { $ } from "../utils/dom";
import { HTMLTemplate, TargetId } from "../types/common";

export default class SkeletonUI {
  private template: HTMLTemplate;

  constructor(template: HTMLTemplate) {
    this.template = template;
  }

  render(targetId: TargetId): void {
    const element = $(targetId);

    if (!(element instanceof HTMLElement)) {
      return;
    }

    element.innerHTML = this.template;
  }

  insert(targetId: string, position: InsertPosition = "beforeend"): void {
    $(targetId)?.insertAdjacentHTML(position, this.template);
  }
}
