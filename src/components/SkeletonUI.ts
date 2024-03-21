import { $ } from "../utils/dom";
import { HTMLTemplate } from "./abstract/BaseComponent";

export default class SkeletonUI {
  private template: HTMLTemplate;

  constructor(template: HTMLTemplate) {
    this.template = template;
  }

  render(targetId: string) {
    const element = $(targetId);

    if (!(element instanceof HTMLElement)) {
      return;
    }

    element.innerHTML = this.template;
  }

  insert(targetId: string, position: InsertPosition = "beforeend") {
    $(targetId)?.insertAdjacentHTML(position, this.template);
  }
}
