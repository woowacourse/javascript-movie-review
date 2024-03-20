export default class Component<T extends HTMLElement, K> {
  protected state: any;
  $target;
  props;
  constructor($target: T, props?: K) {
    this.$target = $target;
    this.props = props;
    this.initializeState();
    this.render(); // 1. render
    this.setEvent(); // 2. props로 받은 이벤트를 주입하는 방식으로 ㅇㅋ?
  }

  protected getTemplate(): string {
    return ``;
  }

  protected setEvent() {}

  protected render() {
    this.$target.innerHTML = this.getTemplate();
    this.createChild();
  }

  protected initializeState() {}

  protected createChild(): void {}

  setState(newState: unknown) {
    this.state = newState;
  }
}
