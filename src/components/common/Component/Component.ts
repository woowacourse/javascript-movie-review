abstract class Component<T = {}> {
  protected $element: HTMLElement;
  protected props?: T;

  constructor(element: HTMLElement, props?: T) {
    this.$element = element;
    this.props = props;

    this.initializeState();
    this.render();
    this.setEvent();
  }

  protected initializeState() {}

  protected render(): void;
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected abstract createComponent(): HTMLElement | string;

  protected setEvent() {}
}

export default Component;
