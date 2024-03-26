interface ElementAttributes {
  tagName: string;
  contents?: string;
  attrs?: { [key: string]: string };
}

const createElement = ({ tagName, contents, attrs }: ElementAttributes) => {
  const newElement = document.createElement(tagName);

  if (contents) newElement.textContent = contents;
  if (!attrs) return newElement;

  Object.keys(attrs).forEach((key) => {
    const value = attrs[key];
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
