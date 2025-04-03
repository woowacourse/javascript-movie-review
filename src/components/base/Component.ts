export default abstract class Component<State = void> {
  protected $element: HTMLElement;
  protected state: State;

  protected constructor(initialState?: State) {
    this.$element = this.createElement();
    this.state = initialState as State;
    this.render();
  }

  protected abstract createElement(): HTMLElement;

  render() {
    this.$element.innerHTML = this.template();
  }

  protected template(): string {
    return "";
  }

  setState(newState: Partial<State>) {
    this.state = { ...this.state, ...newState } as State;
    this.render();
  }

  getElement() {
    return this.$element;
  }
}
