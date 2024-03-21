let debounce: ReturnType<typeof setTimeout> | undefined;

const debouceFunc = (func: () => void) => {
  if (debounce) {
    clearTimeout(debounce);
  }
  debounce = setTimeout(func, 500);
};
export default debouceFunc;
