const throttle = (callback: () => void, delay: number) => {
  let timeId: null | NodeJS.Timeout;

  return () => {
    if (timeId) return;
    timeId = setTimeout(() => {
      callback();
      timeId = null;
    }, delay);
  };
};

export default throttle;
