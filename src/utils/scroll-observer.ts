interface ObserverArguments {
  callback: () => void | Promise<void>;
  options?: IntersectionObserverInit;
}

export const createScrollObserver = ({ callback, options = {} }: ObserverArguments) => {
  const scrollObserver = new IntersectionObserver((elements) => {
    elements.forEach((element) => {
      if (element.isIntersecting) {
        callback();
      }
    });
  }, options);

  return scrollObserver;
};
