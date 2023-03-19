export const executeEventListener = (
  target: Element,
  options: {
    type: string,
    prevent: boolean
  },
  listener: (event: Event) => void
) => {
  target.addEventListener(options.type, (event) => {
    if (options.prevent) {
      event.preventDefault();
    }

    listener(event);
  });
};
