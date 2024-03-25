import { $ } from "../utils/dom";
import { HTMLTemplate, TargetId } from "../types/common";

export default class SkeletonUI {
  private template: HTMLTemplate;

  constructor(template: HTMLTemplate) {
    this.template = template;
  }

  render(targetId: TargetId): void {
    const element = $<HTMLElement>(targetId);

    if (!element) {
      return;
    }

    element.innerHTML = this.template;
  }

  insert(targetId: string, position: InsertPosition = "beforeend"): void {
    const element = $<HTMLElement>(targetId);

    if (!element) {
      return;
    }

    element.insertAdjacentHTML(position, this.template);
  }
}
