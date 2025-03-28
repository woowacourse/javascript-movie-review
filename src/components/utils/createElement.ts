type createElementProps = {
  tag: string;
  classNames?: string[];
};

const createElement = ({
  tag,
  classNames = [],
  ...attributes
}: createElementProps) => {
  const $element = document.createElement(tag);

  classNames.forEach((className) => $element.classList.add(className));

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "required" && $element instanceof HTMLInputElement) {
      $element.required = Boolean(value);
    } else {
      $element.setAttribute(key, value as string);
    }
  });

  return $element;
};

export default createElement;
