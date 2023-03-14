export const executeEventListener = (
  target: Element,
  type: string,
  listener: (event: Event) => void
) => {
  target?.addEventListener(type, (event) => {
    event.preventDefault();

    listener(event);
  });
};
