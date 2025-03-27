import { HTMLType, StrictObject } from '@/lib/types';
import { html } from '@/lib/utils';

export type Props = StrictObject | null;
export type State = StrictObject | null;

export default abstract class Component<TProps extends Props = {}, TState extends State = {}> {
  state = {} as TState;

  #props: TProps;
  #element: HTMLElement | null = null;

  constructor(props?: TProps) {
    this.#props = (props ?? {}) as TProps;
    this.setup();

    this.render();
    this.addEventListener();
  }

  setup() {}

  render() {
    const element = document.createElement('div');
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

  fillSlot(component: Component, slotName: string) {
    const targetSlot = this.element.querySelector(`slot[name=${slotName}]`);
    if (!targetSlot) throw new Error(`name=${slotName} 속성을 가진 slot 요소를 만들어주세요.`);

    targetSlot.replaceWith(component.element);
  }

  get element() {
    return this.#element!;
  }

  get props() {
    return this.#props;
  }

  protected onUnmount() {}

  remove() {
    this.onUnmount();
    this.element.remove();
  }
}
