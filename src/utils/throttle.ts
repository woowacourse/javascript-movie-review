export function eventThrottle(callback: (...arg: Array<any>) => void, limit = 1000) {
  let waiting = false;

  return function (this: HTMLElement, ...args: Array<any>) {
    const context = this;

    if (!waiting) {
      callback.apply(context, args);
      waiting = true;
      setTimeout(() => (waiting = false), limit);
    }
  };
}
