import { forEach } from '@fxts/core';
import { isHTMLElement } from '../../utils';

interface EventCallbackProps {
  event: WindowEventMap[keyof WindowEventMap];
  target: HTMLElement;
  currentTarget: HTMLElement;
}

type EventMapKeyType = keyof WindowEventMap;
interface EventCallback {
  dataAction?: string;
  callback?: (props: EventCallbackProps) => void;
  notTriggerDataAction?: string;
  callbackWindow?: () => void;
}

interface AddEventListenerProps extends EventCallback {
  eventType: EventMapKeyType;
}

export class EventHandler {
  #eventMap = new Map<EventMapKeyType, EventCallback[]>();

  addEventListener({ eventType, callback, callbackWindow, dataAction, notTriggerDataAction }: AddEventListenerProps) {
    const value = this.#eventMap.get(eventType);

    this.#eventMap.set(eventType, [
      ...(value ?? []),
      {
        callback,
        callbackWindow,
        dataAction,
        notTriggerDataAction,
      },
    ]);
  }

  attachEventListener() {
    for (const [eventType, eventActions] of this.#eventMap) {
      window.addEventListener(eventType, (event) => {
        forEach(({ callback, callbackWindow, dataAction, notTriggerDataAction }) => {
          const target = event.target;
          if (!isHTMLElement(target)) {
            callbackWindow?.();
            return;
          }

          const currentTarget = dataAction
            ? (target.closest(`[data-action="${dataAction}"]`) as HTMLElement)
            : document.documentElement;
          const isNotTriggerTarget = target.closest(`[data-action="${notTriggerDataAction}"]`);

          if (!currentTarget || isNotTriggerTarget) return;

          callback?.({ event, target, currentTarget });
        }, eventActions);
      });
    }
  }
}

const eventHandlerInstance = new EventHandler();
export default eventHandlerInstance;
