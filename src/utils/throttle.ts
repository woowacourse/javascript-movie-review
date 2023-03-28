const throttle = <T extends (...args: unknown[]) => ReturnType<T>>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => ReturnType<T> | undefined) => {
  let lastCall = 0;
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  };
};

export default throttle;
