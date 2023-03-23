import { MovieInterface } from '../utils/type';

interface IEvent {
  targetSelector: string;
  event: keyof HTMLElementEventMap;
  callback: (this: Element, e: HTMLElementEventMap[IEvent['event']]) => void;
}

export const $ = (selector: string) => document.querySelector(selector);
export const $$ = (selector: string) => document.querySelectorAll(selector);

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
    callback: IEvent['callback']
  ) {
    events.push({ event, targetSelector, callback });
  },

  setAllEvents() {
    events.forEach(({ targetSelector, event, callback }) => {
      $(targetSelector)?.addEventListener(event, callback);
    });
  },
};

export function toggleMoreButton(result: MovieInterface[]) {
  const moreButton = $('.view-more-button') as HTMLElement;

  if (result.length >= 20 && result.length > 0) return (moreButton.style.display = 'inline-block');
  return (moreButton.style.display = 'none');
}
