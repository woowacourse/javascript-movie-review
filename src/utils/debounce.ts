// export const debounce = (callback, delay) => {
//   let timer;
//   return function () {
//     clearTimeout(timer);
//     timer = setTimeout(_ => callback.apply(this, arguments), delay);
//   };
// };
// export const debounce = <T extends (...args: any[]) => void>(
//   fn: T,
//   duration: number,
// ): ((...args: Parameters<T>) => void) => {
//   let timeoutId: ReturnType<typeof setTimeout> | null = null;

//   return (...args: Parameters<T>): void => {
//     if (timeoutId !== null) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => fn(...args), duration);
//   };
// };

export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>): ReturnType<T> {
    let result: any;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = fn(...args);
    }, delay);
    return result;
  };
};

export const throttling = <T extends (...args: any[]) => any>({
  fn,
  duration,
}: {
  fn: (args: T) => void;
  duration: number;
}) => {
  let lastCall = 0;

  return (args: T) => {
    const now = Date.now();
    if (now - lastCall >= duration) {
      fn(args);
      lastCall = now;
    }
  };
};
