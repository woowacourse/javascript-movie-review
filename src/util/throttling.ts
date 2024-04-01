export const throttleOnRendering = (callback: any, delay = 400) => {
  let timer: NodeJS.Timeout | null = null;

  return () => {
    if (timer === null) {
      timer = setTimeout(() => {
        callback();
        timer = null;
      }, delay);
    }
  };
};
