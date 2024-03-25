import Observer from "./Observer";
import { $ } from "../../utils/dom";
import { HTMLTemplate, TargetId } from "../../types/common";

interface BaseComponentProps {
  targetId: TargetId;
}

export default abstract class BaseComponent extends Observer {
  protected targetId: TargetId;

  constructor({ targetId }: BaseComponentProps) {
    super();
    this.targetId = targetId;
  }

  update(): void {
    this.init();
  }

  init(): void {
    this.render();
  }

  render(): void {
    const element = $(this.targetId);

    if (!element) {
      return;
    }

    element.innerHTML = this.getTemplate();
  }

  protected abstract getTemplate(): HTMLTemplate;
}
