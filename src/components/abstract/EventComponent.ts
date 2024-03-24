import BaseComponent from "./BaseComponent";

export default abstract class EventComponent extends BaseComponent {
  mount(): void {
    super.mount();
    this.onMounted();
  }

  protected render() {
    super.render();
    this.setEvent();
  }

  protected abstract setEvent(): void;

  protected onMounted(): void {}
}
