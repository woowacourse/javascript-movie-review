export const throttle = (callback, delayTime) => {
  let timerId;

  return () => {
    if (timerId) return;

    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, delayTime);
  };
};
