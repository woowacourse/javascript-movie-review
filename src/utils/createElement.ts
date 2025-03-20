export const createElement = (htmlTemplate:string) => {
  const $el = document.createElement("div");
  $el.innerHTML = htmlTemplate.trim();
  
  const firstChild = $el.firstChild;
  if (firstChild instanceof Element) {
    return firstChild as HTMLElement;
  } else {
    return document.createElement("div"); // 또는 예외를 던질 수 있음
  }
};
