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

function createTopScrollAreaElement() {
  const element = document.createElement("div");
  element.classList.add("scroll-area-top");
  element.style.height = "50px";
  return element;
}

let topObserver: IntersectionObserver | null = null;

export default function bindTopInfiniteScrollObserver(hasPrevPage: boolean, callback: () => void) {
  const prevScrollAreaElement = document.querySelector(".scroll-area-top");

  if (prevScrollAreaElement) {
    topObserver?.unobserve(prevScrollAreaElement);
    prevScrollAreaElement.remove();
  }

  if (!hasPrevPage) return;

  const scrollAreaElement = createTopScrollAreaElement();
  const listElement = document.querySelector(".thumbnail-list");
  listElement?.insertAdjacentElement("beforebegin", scrollAreaElement);

  if (topObserver) topObserver.disconnect();

  const throttledCallback = throttle(callback, SHOW_MORE_THROTTLE_MS);

  topObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        throttledCallback();
      }
    });
  }, {
    rootMargin: "200px 0px 0px 0px"
  });

  topObserver.observe(scrollAreaElement);
}
