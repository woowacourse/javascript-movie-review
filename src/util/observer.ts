import { $ } from "./querySelector";

interface RegisterObserverProp {
  callback: () => Promise<void>;
  sentinel: string;
}

interface ReleaseObserverProp {
  sentinel: string;
}

let observer: IntersectionObserver;

export function registerObserver({ callback, sentinel }: RegisterObserverProp) {
  observer = new IntersectionObserver(async ([entry]) => {
    if (entry.isIntersecting) {
      await callback();
    }
  });

  const $sentinel = $(sentinel);
  if ($sentinel) {
    observer.observe($sentinel);
  }
}

export function releaseObserver({ sentinel }: ReleaseObserverProp) {
  const $sentinel = $(sentinel);
  if ($sentinel) observer.unobserve($sentinel);
  observer.disconnect();
}
