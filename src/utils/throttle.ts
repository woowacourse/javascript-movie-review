export function eventThrottle<T extends (...args: Array<unknown>) => ReturnType<T>>(
  callback: T,
  delay = 1000
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let lastCall = 0;

  return function (...args: Parameters<T>): ReturnType<T> | undefined {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return callback(...args);
  };
}
