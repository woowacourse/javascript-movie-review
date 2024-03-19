import { CustomEventListener } from './eventListener.type';

export const on = ({ target, eventName, eventHandler }: CustomEventListener) => {
  target.addEventListener(eventName, eventHandler);
};

export const off = ({ target, eventName, eventHandler }: CustomEventListener) => {
  target.removeEventListener(eventName, eventHandler);
};
