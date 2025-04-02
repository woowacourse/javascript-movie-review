export function throttle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timerId: number | null = null;

  return function (...args: Parameters<T>): void {
    if (timerId) return;

    timerId = window.setTimeout(() => {
      callback(...args);
      timerId = null;
    }, delay);
  };
}
