import { SHOW_MORE_THROTTLE_MS } from "../constants";

function throttle<T extends (...args: any[]) => void>(callback: T, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timer) return;

    callback(...args);

    timer = setTimeout(() => {
      timer = null;
    }, ms);
  };
};

function createScrollAreaElement() {
  const element = document.createElement("div");
  element.classList.add("scroll-area");
  element.style.height = "50px";
  return element;
}

let observer: IntersectionObserver | null = null;

export default function bindInfiniteScrollObserver(hasNextPage: boolean, callback: () => void) {
  const prevScrollAreaElement = document.querySelector(".scroll-area");

  if (prevScrollAreaElement) {
    observer?.unobserve(prevScrollAreaElement);
    prevScrollAreaElement.remove();
  }

  if (!hasNextPage) return;

  const scrollAreaElement = createScrollAreaElement();
  document.querySelector(".thumbnail-list")?.insertAdjacentElement("afterend", scrollAreaElement);

  if (observer) observer.disconnect();

  const throttledCallback = throttle(callback, SHOW_MORE_THROTTLE_MS);

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        throttledCallback();
      }
    });
  }, {
    rootMargin: "0px 0px 200px 0px"
  });

  observer.observe(scrollAreaElement);
}