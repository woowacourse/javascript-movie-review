export const throttle = <T extends unknown[]>(
  callback: (...args: T) => void,
  limit: number,
): ((...args: T) => void) => {
  let lastTimer: NodeJS.Timeout;
  let lastExecuteFunctionTime: number;

  return function (...args: T) {
    if (!lastExecuteFunctionTime) {
      callback(...args);
      lastExecuteFunctionTime = Date.now();
    } else {
      clearTimeout(lastTimer);

      lastTimer = setTimeout(function () {
        if (Date.now() - lastExecuteFunctionTime >= limit) {
          callback(...args);
          lastExecuteFunctionTime = Date.now();
        }
      }, limit - (Date.now() - lastExecuteFunctionTime));
    }
  };
};
