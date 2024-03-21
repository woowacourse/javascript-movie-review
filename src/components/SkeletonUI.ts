import { HTMLTemplate } from "./abstract/BaseComponent";
import { $ } from "../utils/dom";

export default class SkeletonUI {
  private template: HTMLTemplate;

  constructor(template: HTMLTemplate) {
    this.template = template;
  }

  render(targetId: string): void {
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
