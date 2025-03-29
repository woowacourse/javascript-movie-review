interface addEventProps {
  type: string;
  selector: string;
  handler: (event: Event | KeyboardEvent, target?: Element) => void;
}

export function addEvent({ type, selector, handler }: addEventProps) {
  window.addEventListener(type, (event) => {
    const target = event.target as HTMLElement;
    if (selector === "") {
      handler(event);
    } else if (target && target.closest(selector)) {
      handler(event, target.closest(selector)!);
    }
  });
}
