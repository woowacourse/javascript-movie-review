export const throttling = <T>({ fn, duration }: { fn: (args: T) => void; duration: number }) => {
  let lastCall = 0;

  return (args: T) => {
    const now = Date.now();
    if (now - lastCall >= duration) {
      fn(args);
      lastCall = now;
    }
  };
};
