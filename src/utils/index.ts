export const $ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelector(selector);
export const $$ = (selector: string, parentNode: ParentNode | null = document) =>
  parentNode && parentNode.querySelectorAll(selector);

export const render = (template: string) => {
  const bodyElem = $('#app') as HTMLElement;
  bodyElem.innerHTML = template;
  // bodyElem.innerHTML = template();
  // setEvent.setAllevent();
};

export const event = {
  events: [],

  addEvent(element: string, event: 'click' | 'submit', callback: Function) {
    // this.events.push({});
  },
  /*
  setAllevent() {
    this.events.forEach((event) => {
      Element.addEven-- - ('event', callback);
    });
  },
  */
};
