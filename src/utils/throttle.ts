export function eventThrottle(callback: (...arg: Array<any>) => void, limit = 1000) {
  let waiting = false;

  return function (...args: Array<any>) {
    if (waiting) return;
    callback(...args);
    waiting = true;
    setTimeout(() => {
      waiting = false;
    }, limit);
  };
}
