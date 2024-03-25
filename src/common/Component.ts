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

  protected initializeState(): void {}

  protected render(): void {}

  protected setEvent(): void {}

  public rerender(...args: unknown[]): void;

  public rerender() {
    this.render();
    this.setEvent();
  }
}
