const renderTemplate = (container: HTMLElement, html: string): void => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  container.replaceChildren(template.content.cloneNode(true));
};

const appendHTMLs = (container: HTMLElement, html: string): void => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  container.append(...Array.from(template.content.childNodes));
};

const appendHTML = (container: HTMLElement, html: string): void => {
  const template = document.createElement("template");
  template.innerHTML = html.trim();
  container.appendChild(template.content.firstChild as Node);
};

const isScrolledToBottom = (): boolean => {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
};

export { renderTemplate, appendHTMLs, appendHTML, isScrolledToBottom };
