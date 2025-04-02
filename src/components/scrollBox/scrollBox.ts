import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import scrollToBottom from "./internal/scrollToBottom";
import scrollToTop from "./internal/scrollToTop";

const scrollBox = () => {
  const $scrollBox = createElementWithAttributes({
    tag: "div",
    className: "scroll-box",
  });

  $scrollBox.append(scrollToTop(), scrollToBottom());

  return $scrollBox;
};

export default scrollBox;
