const Throttle = (callback: () => void, delay: number) => {
  let timerId: ReturnType<typeof setTimeout> | null;

  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, delay);
  };
};

export default Throttle;
