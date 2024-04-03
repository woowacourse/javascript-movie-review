export const dispatchCustomEvent = <T>(eventName: string, detail: T) => {
  const customEvent = new CustomEvent<T>(eventName, { detail });

  document.dispatchEvent(customEvent);
};

export const listenCustomEvent = <T>(
  eventName: string,
  callback: (event: CustomEvent<T>) => void,
) => {
  const eventCallback: EventListener = (event: Event) => {
    callback(event as CustomEvent<T>);
  };

  document.addEventListener(eventName, eventCallback);
};
