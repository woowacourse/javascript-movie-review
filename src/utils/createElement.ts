export const createElement = (
  htmlTemplate: string,
  events?: { [key: string]: () => void }
) => {
  const $el = document.createElement("div");
  $el.innerHTML = htmlTemplate.trim();

  const firstChild = $el.firstChild;
  if (events) {
    Object.entries(events).forEach(([key, value]) => {
      firstChild?.addEventListener(key, value);
    });
  }

  if (firstChild instanceof Element) {
    return firstChild as HTMLElement;
  } else {
    return document.createElement("div"); // 또는 예외를 던질 수 있음
  }
};
