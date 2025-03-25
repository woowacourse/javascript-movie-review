// export const debounce = (callback: () => void) => {
//   let id = -1;

//   return () => {
//     cancelAnimationFrame(id);

//     id = requestAnimationFrame(callback);
//   };
// };

export const timeoutDebounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>): Promise<unknown> => {
    return new Promise((resolve) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const result = await fn(...args);
        resolve(result);
      }, delay);
    });
  };
};
