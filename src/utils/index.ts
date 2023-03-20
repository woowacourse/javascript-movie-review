import { MovieInterface } from '../utils/type';

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
          const $parent = $(parentSelector);

          if (isTarget(e.target, { targetSelector, parentSelector }) && $parent)
            callback.call($parent, e);
        });
      } else {
        $(targetSelector)?.addEventListener(event, callback);
      }
    });
  },
};

export function toggleMoreButton(result: MovieInterface[]) {
  const moreButton = $('.view-more-button') as HTMLElement;

  if (result.length >= 20 && result.length > 0) return (moreButton.style.display = 'inline-block');
  return (moreButton.style.display = 'none');
}
