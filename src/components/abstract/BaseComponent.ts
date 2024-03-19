import { $ } from "../../utils/dom";

export type HTMLTemplate = string;
type ElementId = string;
interface BaseComponentProps {
  targetId: ElementId;
}

export default abstract class BaseComponent {
  private targetId: ElementId;
  constructor({ targetId }: BaseComponentProps) {
    this.targetId = targetId;
  }

  init() {
    this.render();
  }

  render() {
    const element = $(this.targetId);

    if (!element) {
      return;
    }

    element.innerHTML = this.getTemplate();
  }

  abstract getTemplate(): HTMLTemplate;
}
