interface ElementAttributes {
  tagName: string;
  contents?: string;
  attrs?: { [key: string]: string };
}

const createElement = ({ tagName, contents, attrs }: ElementAttributes) => {
  const newElement = document.createElement(tagName);

  if (!attrs) return newElement;
  if (contents) newElement.textContent = contents;

  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];
    if (key === "contents") {
      newElement.textContent = value;
      return;
    }

    if (key === "class") {
      const classLists = value.trim().split(" ");
      newElement.classList.add(...classLists);
      return;
    }

    newElement.setAttribute(key, value);
  });

  return newElement;
};

export default createElement;
