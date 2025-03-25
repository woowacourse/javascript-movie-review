interface CreateDOMElementProps {
  tag: string;
  children?: (HTMLElement | undefined | null)[] | HTMLElement | undefined;
  [key: string]: any;
}

const createDOMElement = ({
  tag,
  children,
  className,
  ...props
}: CreateDOMElementProps): HTMLElement => {
  if (!tag) throw new Error("Tag is required");

  const element = document.createElement(tag);

  applyClassName(element, className);
  applyAttributes(element, props);
  appendChildren(element, children);

  return element;
};

export default createDOMElement;

const applyClassName = (element: HTMLElement, className?: string) => {
  if (!className) return;
  const classList = className.split(" ").filter((c) => c.trim() !== "");
  classList.forEach((cls) => element.classList.add(cls));
};

const applyAttributes = (element: HTMLElement, props: Record<string, any>) => {
  Object.entries(props).forEach(([key, value]) => {
    if (key in element) {
      (element as any)[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  });
};

const appendChildren = (
  element: HTMLElement,
  children?: (HTMLElement | undefined | null)[] | HTMLElement,
) => {
  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (child) element.appendChild(child);
      });
    } else {
      element.appendChild(children);
    }
  }
};
