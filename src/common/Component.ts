export default class Component<T = {}, K = {}> {
  protected state?: K;

  protected $target;

  protected props;

  constructor($target: HTMLElement, props?: T) {
    this.$target = $target;
    this.props = props;

    this.initializeState();
    this.render();
    this.setEvent();
  }

  protected getTemplate(): string {
    return ``;
  }

  protected setEvent() {}

  protected createChild(): void {}

  protected render() {
    this.$target.innerHTML = this.getTemplate();
    this.createChild();
  }

  protected initializeState() {}

  protected setState(newState: K) {
    this.state = newState;
  }
}
