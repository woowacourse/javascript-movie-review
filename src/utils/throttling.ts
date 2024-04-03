export const throttling = <T extends (...args: any[]) => any>({
  fn,
  duration,
}: {
  fn: (...args: Parameters<T>) => void;
  duration: number;
}) => {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= duration) {
      fn(...args);
      lastCall = now;
    }
  };
};
