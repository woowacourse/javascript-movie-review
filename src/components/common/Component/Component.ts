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

  protected abstract render(): void;

  protected abstract createComponent(): HTMLElement | HTMLElement[];

  protected setEvent() {}
}

export default Component;
