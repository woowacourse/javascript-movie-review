abstract class Component<T = {}> {
  protected $element: HTMLElement;
  protected props?: T;

  constructor(element: HTMLElement, props?: T) {
    this.$element = element;
    this.props = props;

    this.render();
    this.initializeState();
    this.setEvent();
  }

  protected initializeState() {}

  protected abstract render(): void;

  protected abstract createComponent(): HTMLElement | string;

  protected setEvent() {}
}

export default Component;
