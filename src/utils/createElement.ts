const createElement = <T extends HTMLElement>(tagName:string,options?:{
  attrs?: { [key: string]: string },
  content?: string}
):T=> {

  const {attrs, content}=options??{}
  
  const newElement = document.createElement(tagName);

  if (content) newElement.textContent = content;
  if (!attrs) return newElement as T;

  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];
    if (key === "class") {
      const classLists = value.trim().split(" ");
      newElement.classList.add(...classLists);
      return
    }
    newElement.setAttribute(key, value);
  });

  return newElement as T;
};

export default createElement;
