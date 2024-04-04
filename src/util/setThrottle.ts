interface SetThrottleType {
  callbackFunction: () => void;
  delay: number;
}

export default function setThrottle({ callbackFunction, delay }: SetThrottleType) {
  let throttleTimeout: number | null = null;

  return function () {
    if (throttleTimeout === null) {
      throttleTimeout = window.setTimeout(() => {
        callbackFunction();
        throttleTimeout = null;
      }, delay);
    }
  };
}
