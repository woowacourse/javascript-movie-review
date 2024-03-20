import { $ } from "../../utils/dom";
import Observer from "./Observer";

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

  update() {
    this.init();
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
