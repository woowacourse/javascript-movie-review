export const throttleOnRendering = (callback: (...args: any[]) => any, delay = 400) => {
  let timer: number | null = null;

  return (...args: any[]) => {
    if (timer === null) {
      timer = window.setTimeout(() => {
        callback(...args);
        timer = null;
      }, delay);
    }
  };
};
