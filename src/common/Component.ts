export default class Component<T, K> {
  $target;
  state: any;
  props;
  constructor($target: T, props?: K) {
    this.$target = $target;
    this.props = props;
    this.render(); // 1. render
    this.setEvent(); // 2. props로 받은 이벤트를 주입하는 방식으로 ㅇㅋ?
  }

  protected getTemplate() {}

  protected setEvent() {}

  protected render() {}

  setState(newState: unknown) {
    this.state = newState;
  }
}
