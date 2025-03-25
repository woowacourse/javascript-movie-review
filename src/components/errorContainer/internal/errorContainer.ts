import { createElementWithAttributes } from "../../utils/createElementWithAttributes";

const errorContainer = (error: Error) => {
  const $errorContainer = createElementWithAttributes({
    tag: "div",
    className: "error-container",
    children: [
      { tag: "h1", textContent: `${error.message} 새로고침 해주세요!` },
    ],
  });

  return $errorContainer;
};
export default errorContainer;
