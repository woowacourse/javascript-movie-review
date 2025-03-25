import { timeoutDebounce } from "./debounce";
import { $, isTarget } from "./domHelper";

export interface EventCallback {
  (e: HTMLElementEventMap[keyof HTMLElementEventMap]): void;
}
export interface Event {
  parentSelector: string;
  targetSelector: string;
  event: keyof HTMLElementEventMap;
  callback: EventCallback;
}

interface Options {
  events: Event[];
  root: null | Element;
  rootComponent: null | (() => string);
}

// export interface Dispatch<T> {
//   (value: T): void;
// }

function Core() {
  const options: Options = {
    events: [],
    root: null,
    rootComponent: null,
  };

  const _render = timeoutDebounce(() => {
    const { root, rootComponent } = options;
    if (!root || !rootComponent) return;
    root.innerHTML = rootComponent();

    _addEvent();

    options.events = [];
  }, 100);

  function render(
    rootComponent: Options["rootComponent"],
    root: Options["root"]
  ) {
    options.root = root;
    options.rootComponent = rootComponent;
    _render();
  }

  function useEvents(parentSelector: string) {
    function addEvent(
      event: Event["event"],
      targetSelector: Event["targetSelector"],
      callback: Event["callback"]
    ) {
      const { events } = options;

      events.push({ event, targetSelector, parentSelector, callback });
    }

    return [addEvent];
  }

  function _addEvent() {
    options.events.forEach(
      ({ parentSelector, targetSelector, event, callback }) => {
        $(parentSelector)?.addEventListener(event, (e) => {
          const $parent = $(parentSelector);

          if (isTarget(e.target, { targetSelector, parentSelector }) && $parent)
            callback(e);
        });
      }
    );
  }

  function reRender() {
    _render();
  }

  return { useEvents, render, reRender };
}

export const { useEvents, render, reRender } = Core();
