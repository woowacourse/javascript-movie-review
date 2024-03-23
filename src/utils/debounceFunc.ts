let debounce: ReturnType<typeof setTimeout> | undefined;

const debounceFunc = (func: () => void) => {
  if (debounce) {
    clearTimeout(debounce);
  }
  debounce = setTimeout(func, 1000);
};
export default debounceFunc;
