interface DebounceProps {
  callback: () => void;
  delay: number;
}
const debounce = ({ callback, delay }: DebounceProps) => {
  let timer: NodeJS.Timeout | undefined;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback();
    }, delay);
  };
};

export default debounce;
