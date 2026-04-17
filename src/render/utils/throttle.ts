export function throttle<T extends (...args: any[]) => Promise<unknown> | void>(callback: T) {
  let inFlight: Promise<unknown> | null = null;

  return (...args: Parameters<T>): void => {
    if (inFlight) return;

    inFlight = Promise.resolve(callback(...args)).finally(() => {
      inFlight = null;
    });
  };
}
