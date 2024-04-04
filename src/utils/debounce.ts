interface Props {
  callback: () => void;
  delay: number;
}

export const debounce = ({ callback, delay }: Props) => {
  let timeout: NodeJS.Timeout;

  return () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
    }, delay);
  };
};
