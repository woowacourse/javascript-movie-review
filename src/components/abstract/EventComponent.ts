import BaseComponent from "./BaseComponent";

export default abstract class EventComponent extends BaseComponent {
  initialize(): void {
    super.initialize();
    this.onInitialized();
  }

  protected render() {
    super.render();
    this.setEvent();
  }

  protected abstract setEvent(): void;

  protected onInitialized(): void {}
}
