function debounce(
  func: (...args: any[]) => void,
  wait: number = 200
): (...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function (this: any, ...args: any[]) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

export default debounce;
