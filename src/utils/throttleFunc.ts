let throttle: NodeJS.Timeout | null = null;

const throttleFunc = (func: () => void) => {
  if (!throttle) {
    throttle = setTimeout(() => {
      throttle = null;
      func();
    }, 300);
  }
};

export default throttleFunc;
