const Throttle = (callback, delay) => {
  let timerId;

  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, delay);
  };
};

export default Throttle;
