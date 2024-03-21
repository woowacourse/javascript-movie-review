import Observer from "./Observer";
import { $ } from "../../utils/dom";

export type HTMLTemplate = string;
export type ElementId = string;
interface BaseComponentProps {
  targetId: ElementId;
}

export default abstract class BaseComponent extends Observer {
  protected targetId: ElementId;

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
