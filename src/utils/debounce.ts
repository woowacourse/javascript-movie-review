// debounce reference
// https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940

interface DebounceProps<T> {
  callback: T;
  wait: number;
}

function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>({
  callback,
  wait = 3000,
}: DebounceProps<T>) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), wait);
  };
}

export default debounce;
