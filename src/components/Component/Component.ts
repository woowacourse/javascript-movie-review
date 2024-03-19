import { CustomEventListener } from './Component.type';

abstract class Component<T = {}> {
  constructor() {
    this.render();
    this.setEvent();
  }

  protected abstract render(props?: T): void;
  protected abstract render(...args: unknown[]): void;

  protected setEvent() {}

  protected querySelector<E extends Element>(selector: string, target: Element | Document = document) {
    const element = target.querySelector<E>(selector);

    if (!element) {
      throw new Error('[ERROR] 요소를 찾을 수 없습니다.');
    }

    return element;
  }

  protected querySelectorAll<E extends Element>(selector: string, target: Element | Document = document) {
    const element = target.querySelectorAll<E>(selector);

    if (!element) {
      throw new Error('[ERROR] 요소를 찾을 수 없습니다.');
    }

    return element;
  }

  protected on({ target, eventName, eventHandler }: CustomEventListener) {
    target.addEventListener(eventName, eventHandler);
  }

  protected off({ target, eventName, eventHandler }: CustomEventListener) {
    target.removeEventListener(eventName, eventHandler);
  }
}

export default Component;
