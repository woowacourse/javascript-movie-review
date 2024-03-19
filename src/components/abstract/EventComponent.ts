import BaseComponent, { HTMLTemplate } from "./BaseComponent";

export default abstract class EventComponent extends BaseComponent {
  init() {
    this.render();
    this.setEvent();
  }

  abstract getTemplate(): HTMLTemplate;

  abstract setEvent(): void;
}
