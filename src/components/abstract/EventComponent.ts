import BaseComponent, { HTMLTemplate } from "./BaseComponent";

export default abstract class EventComponent extends BaseComponent {
  init(): void {
    this.render();
    this.setEvent();
  }

  protected abstract getTemplate(): HTMLTemplate;

  protected abstract setEvent(): void;
}
