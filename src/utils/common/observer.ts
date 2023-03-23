import { $ } from './domHelper';

interface ObserverOptions {
  onIntersect(): void;
}

export const observer = (selector: string, { onIntersect }: ObserverOptions) => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onIntersect();
    });
  });

  setTimeout(() => {
    io.observe($(selector)!);
  }, 0);
};
