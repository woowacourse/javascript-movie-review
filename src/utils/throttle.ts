interface ThrottleProps {
  callback: (...args: any[]) => Promise<unknown>;
  delay: number;
}

const throttleAsync = ({ callback, delay }: ThrottleProps) => {
  let timer: NodeJS.Timeout | undefined;

  return (...args: any[]) =>
    new Promise(resolve => {
      if (!timer) {
        timer = setTimeout(async () => {
          const result = await callback(...args);
          timer = undefined;
          resolve(result);
        }, delay);
      }
    });
};

export default throttleAsync;
