const useThrottle = (callback: () => void, delay: number = 300) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        callback();
        timer = null;
      }, delay);
    }
  };
};

export default useThrottle;
