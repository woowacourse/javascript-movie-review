import { Observer } from '@/modules';
import { errorMessage } from '@/modules';
import { Store } from '@/store';
import { HTMLType, StrictObject } from '@/types';
import { html } from '@/utils';
import { forEach } from '@fxts/core';

export type Props = StrictObject | null;
export type State = StrictObject | null;

export default abstract class Component<TProps extends Props = {}, TState extends State = {}> implements Observer {
  state = {} as TState;

  #props: TProps;
  #element: HTMLElement | null = null;

  constructor(props?: TProps) {
    this.#props = (props ?? {}) as TProps;
    this.setup();

    this.render();
    this.addEventListener();
  }

  subsribe(stores?: Store<any>[]) {
    if (!stores) return;

    forEach((store) => {
      store.subscribe(this);
    }, stores);
  }

  update() {
    this.render();
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

  setState(nextState: Partial<TState>) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  template(): HTMLType {
    return html`<div></div>`;
  }

  fillSlot(component: Component, slotName: string) {
    const targetSlot = this.element.querySelector(`slot[name=${slotName}]`);
    if (!targetSlot) throw new Error(errorMessage.get('slot', slotName));

    targetSlot.replaceWith(component.element);
  }

  remove() {
    this.onUnmount();
    this.element.remove();
  }

  get element() {
    return this.#element!;
  }

  get props() {
    return this.#props;
  }

  addEventListener() {}

  onRender() {}

  protected onUnmount() {}
}
