export const throttle = <T extends []>(
  callback: (...args: T) => void,
  delay: number = 300
): ((...args: T) => void) => {
  let waiting: NodeJS.Timeout | null = null;

  const throttledFunction = (...args: T) => {
    if (!waiting) {
      waiting = setTimeout(() => {
        callback(...args);
        waiting = null;
      }, delay);
    }
  };

  return throttledFunction;
};
