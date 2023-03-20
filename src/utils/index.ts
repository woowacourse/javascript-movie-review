interface IEvent {
  parentSelector?: string;
  targetSelector: string;
  event: keyof HTMLElementEventMap;
  callback: (this: Element, e: HTMLElementEventMap[IEvent['event']]) => void;
}

export const $ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelector(selector);

export const $$ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelectorAll(selector);

export const isTarget = (
  target: EventTarget | null,
  { targetSelector, parentSelector }: { targetSelector: string; parentSelector: string }
) => {
  const children = $$(targetSelector, $(parentSelector));
  if (target instanceof Element && children)
    return [...children].includes(target) || target.closest(targetSelector);

  return false;
};

export const render = (template: string) => {
  const bodyElem = $('#app') as HTMLElement;
  bodyElem.innerHTML = template;
  Event.setAllEvents();
};

const events: IEvent[] = [];

export const Event = {
  addEvent(
    event: IEvent['event'],
    targetSelector: IEvent['targetSelector'],
    callback: IEvent['callback'],
    parentSelector?: IEvent['parentSelector']
  ) {
    events.push(
      parentSelector
        ? { event, targetSelector, callback, parentSelector }
        : { event, targetSelector, callback }
    );
  },

  setAllEvents() {
    events.forEach(({ parentSelector, targetSelector, event, callback }) => {
      if (parentSelector) {
        $(parentSelector)?.addEventListener(event, (e) => {
          const $parent = $(parentSelector) as HTMLElement;

          if (!isTarget(e.target, { targetSelector, parentSelector })) return;
          callback.call($parent, e);
        });
        return;
      }

      $(targetSelector)?.addEventListener(event, callback);
    });
  },
};
