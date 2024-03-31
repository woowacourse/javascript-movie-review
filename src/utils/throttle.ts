export const throttle = (callback: () => void, delay: number): (() => void) => {
  let isThrottled = false;

  return () => {
    if (isThrottled) {
      return;
    }

    isThrottled = true;

    setTimeout(() => {
      callback();
      isThrottled = false;
    }, delay);
  };
};
