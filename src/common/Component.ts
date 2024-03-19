export default class Component<T = unknown> {
  $target;
  state: any;
  props;
  constructor($target: Element | null, props?: T) {
    this.$target = $target;
    this.props = props;
    this.render();
    this.setEvent();
  }

  protected getTemplate() {}

  protected setEvent{}

    protected render{}

  comprotec ponentDidMount() {}

  setState(newState: unknown) {
    this.state = newState;
  }
}
