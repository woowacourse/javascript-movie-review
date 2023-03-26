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
  const dialogElem = $('dialog') as HTMLDialogElement;
  // dialogElem.showModal();
  // dialogElem.close();
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
