let throttle: NodeJS.Timeout | null = null;

// window.addEventListener("scroll", () => {
//   if (!throttle) {
//     throttle = setTimeout(() => {
//       throttle = null;
//     }, 300);
//   }
// });

const throttleFunc = (func: () => void) => {
  if (!throttle) {
    throttle = setTimeout(() => {
      throttle = null;
      func();
    }, 300);
  }
};

export default throttleFunc;
