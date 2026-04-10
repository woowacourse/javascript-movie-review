export const replaceHTML = (parent: Element, html: string) => {
  parent.innerHTML = html;
};

export const appendHTML = (parent: Element, html: string) => {
  parent.innerHTML += html;
};

export const clearHTML = (parent: Element) => {
  parent.innerHTML = "";
};

export const removeElement = (element: Element) => {
  element.remove();
};

export const filterHTML = (parent: Element, className: string) => {
  parent.innerHTML = [...parent.children]
    .filter((child) => {
      if (child instanceof HTMLElement) {
        return !child.classList.contains(className);
      }
      return true;
    })
    .map((child) => child.outerHTML)
    .join("");
};
