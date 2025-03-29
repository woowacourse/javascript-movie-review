interface ObserverProps {
  callback: (entries: IntersectionObserverEntry[]) => void;
  options: IntersectionObserverInit;
}

const createObserver = ({ callback, options }: ObserverProps) => {
  let observer = new IntersectionObserver(callback, options);

  const observeTarget = (target: Element) => {
    if (!observer) return;

    observer.observe(target);
  };

  const unObserveTarget = (target: Element) => {
    if (!observer) return;

    observer.unobserve(target);
  };

  const disconnect = () => {
    if (!observer) return;

    observer.disconnect();
  };

  return { observeTarget, unObserveTarget, disconnect };
};

export default createObserver;
