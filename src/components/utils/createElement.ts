type createElementProps = {
  tag: string;
  classNames?: string[];
  dataset?: Record<string, string>;
} & Record<string, any>;

const createElement = ({
  tag,
  classNames = [],
  dataset,
  ...attributes
}: createElementProps) => {
  const $element = document.createElement(tag);

  classNames.forEach((className) => $element.classList.add(className));

  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      $element.dataset[key] = value;
    });
  }

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
