export const throttle = (callback: () => void, delay: number = 300) => {
  let waiting: NodeJS.Timeout | null = null;

  const throttledFunction = () => {
    if (waiting) return;

    waiting = setTimeout(() => {
      callback();
      waiting = null;
    }, delay);
  };

  return throttledFunction;
};
