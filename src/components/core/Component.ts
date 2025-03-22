import { HTMLType, StrictObject } from "../../types";
import { html } from "../../utils";

export default abstract class Component<
  Props extends StrictObject | null = {},
  State extends StrictObject | null = {}
> {
  state = {} as State;

  #props: Props;
  #element: HTMLElement | null = null;

  constructor(props?: Props) {
    this.#props = (props ?? {}) as Props;
    this.setup();

    this.render();
    this.addEventListener();

    this.dataFetchAsync();
  }

  dataFetchAsync() {}

  setup() {}

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.template();

    const elementFirstChild = element.firstElementChild as HTMLElement;

    if (!this.#element) this.#element = elementFirstChild;
    else this.#element.innerHTML = elementFirstChild.innerHTML;

    this.onRender();

    return this.#element;
  }

  setState(nextState: Partial<State>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  appendChild(element: HTMLElement, selector?: string) {
    if (selector) this.element.querySelector(selector)?.appendChild(element);
    else this.element.appendChild(element);
  }

  template(): HTMLType {
    return html`<div></div>`;
  }

  addEventListener() {}

  onRender() {}

  fillSlot(element: HTMLElement, slotName: string) {
    const targetSlot = this.element.querySelector(`slot[name=${slotName}]`);
    if (!targetSlot)
      throw new Error(`name=${slotName} 속성을 가진 slot 요소를 만들어주세요.`);

    targetSlot.replaceWith(element);
  }

  get element() {
    return this.#element!;
  }

  get props() {
    return this.#props;
  }
}
