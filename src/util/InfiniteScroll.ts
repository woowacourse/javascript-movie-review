export const infiniteScroll = (target: string, fn: CallableFunction) => {
  const options = {
    threshold: 0.3,
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      fn().then(() => {
        const eventTarget = document.querySelector(target);
        io.disconnect();
        io.observe(eventTarget!);
      });
    });
  }, options);
  const last = document.querySelector(target);

  io.observe(last!);
};
