import BaseComponent, { HTMLTemplate } from "./BaseComponent";

export default abstract class EventComponent extends BaseComponent {
  mount(): void {
    super.mount();
    this.setEvent();
  }

  protected abstract setEvent(): void;
}
