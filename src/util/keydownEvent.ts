interface keydownType {
  event: KeyboardEvent;
  key: string;
  func: () => void;
}

export const keydownEvent = ({ event, key, func }: keydownType) => {
  if (event.key === key) {
    if (!event.isComposing) {
      event.preventDefault();
      func();
    }
  }
};
