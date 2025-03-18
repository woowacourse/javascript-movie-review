const createElement = ({ tag, classNames = [], ...attributes }) => {
  const $element = document.createElement(tag);

  classNames.forEach((className) => $element.classList.add(className));

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'required') {
      $element.required = Boolean(value);
    } else {
      $element.setAttribute(key, value);
    }
  });

  return $element;
};

export default createElement;
