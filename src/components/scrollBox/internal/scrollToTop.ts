import { createElementWithAttributes } from "../../utils/createElementWithAttributes";

const scrollToTop = () => {
  const $scrollButton = createElementWithAttributes({
    tag: "button",
    className: "scroll-to-top",
    textContent: "⬆",
  });

  $scrollButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  return $scrollButton;
};

export default scrollToTop;
