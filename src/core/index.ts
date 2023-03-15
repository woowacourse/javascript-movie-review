import { Props, UnPack } from '../types/common';
import { debounce } from '../utils/common/debounce';

export interface EventCallback {
  (e: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
}
export interface Event {
  event: keyof HTMLElementEventMap;
  callback: EventCallback;
}

interface Options<T = unknown> {
  currentStateKey: number;
  states: T[];
  events: Event[];
  root: null | Element;
  rootComponent: null | ((props: Props<{}>) => Element | null);
}

interface GetElement<T> {
  (props: T): [Element | null, Event[]];
}

type Dispatch<T> = (value: T) => void;

function Core() {
  const options: Options<UnPack<Parameters<typeof useState>>> = {
    currentStateKey: 0,
    states: [],
    events: [],
    root: null,
    rootComponent: null,
  };

  function useState<S = undefined>(initialState?: S): [S, Dispatch<S>];
  function useState<S>(initialState?: S): [unknown, Dispatch<S>] {
    const { currentStateKey: key, states } = options;
    if (states.length === key) states.push(initialState);

    const state = states[key];

    const setState = (newState: S) => {
      if (newState === state) return;

      states[key] = newState;
      _render();
    };
    options.currentStateKey += 1;

    return [state, setState];
  }

  const _render = debounce(() => {
    const { root, rootComponent } = options;
    const component = rootComponent?.({});
    console.log('here');
    if (!root || !component) return;
    root.innerHTML = '';
    root.appendChild(component);
    options.currentStateKey = 0;

    options.events = [];
  });

  function render(rootComponent: Options['rootComponent'], root: Options['root']) {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  }

  return { useState, render };
}

export const { useState, render } = Core();

export const addEvent = ({ $element, event, callback }: { $element: Element } & Event) => {
  $element.addEventListener(event, callback);
};

export const assemble =
  <T = Props>(getElement: GetElement<T>) =>
  (props: T) => {
    try {
      const [$element, $events = []] = getElement(props);

      if (!$element) throw new Error('이벤트를 등록할 엘리먼트가 존재하지 않습니다.');

      $events.forEach(({ event, callback }) => addEvent({ $element, event, callback }));

      return $element;
    } catch (error) {
      return null;
    }
  };
