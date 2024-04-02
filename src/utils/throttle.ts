const throttle = () => {
  let timer: NodeJS.Timeout | null;
  return {
    throttling(callbackFn: () => void, timeout: number) {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          callbackFn();
        }, timeout);
      }
    },
  };
};

export default throttle;
