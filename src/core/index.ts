import { Props, UnPack } from '../types/common';
import { debounce } from '../utils/common/debounce';
import { replaceComponent, $ } from '../utils/common/domHelper';

export interface EventCallback {
  (e: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
}
export interface Event {
  event: keyof HTMLElementEventMap;
  callback: EventCallback;
}

export interface Effect {
  callback(): unknown;
  deps: unknown[];
}

interface Options<T = unknown> {
  currentStateKey: number;
  currentEffectsKey: number;
  states: T[];
  events: Event[];
  effects: Effect[];
  componentList: [string, Element | null][];
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
    currentEffectsKey: 0,
    states: [],
    events: [],
    effects: [],
    componentList: [],
    root: null,
    rootComponent: null,
  };

  function useState<S = undefined>(initialState?: S): [S, Dispatch<S>];
  function useState<S>(initialState?: S): [unknown, Dispatch<S>] {
    const { currentStateKey: key, states } = options;
    if (states.length === key) states.push(initialState);

    const state = states[key];

    const setState = (newState: S) => {
      states[key] = newState;
      _render();
    };
    options.currentStateKey += 1;

    return [state, setState];
  }

  const useEffect = (callback: Effect['callback'], deps: Effect['deps']) => {
    const { currentEffectsKey: key, effects } = options;
    if (effects.length === key) {
      effects.push({ deps, callback });
      callback();
    }

    if (JSON.stringify(effects[key].deps) !== JSON.stringify(deps)) {
      callback();
      effects[key] = { deps, callback };
    }

    options.currentEffectsKey += 1;
  };

  const _render = debounce(() => {
    const { root, rootComponent } = options;
    const component = rootComponent?.({});

    if (!root || !component) return;
    root.innerHTML = '';
    root.appendChild(component);
    _replaceComponents();

    options.currentStateKey = 0;
    options.currentEffectsKey = 0;

    options.events = [];
  });

  const setComponentList = (target: string, component: Element | null) => {
    const { componentList } = options;
    componentList.push([target, component]);
  };

  const _replaceComponents = () => {
    const { componentList } = options;
    componentList.reverse().forEach(([target, component]) => {
      replaceComponent($(target), component);
    });

    options.componentList = [];
  };

  function render(rootComponent: Options['rootComponent'], root: Options['root']) {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  }

  return { useState, useEffect, render, setComponentList };
}

export const { useState, useEffect, render, setComponentList } = Core();

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
