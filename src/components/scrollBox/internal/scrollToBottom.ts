import { createElementWithAttributes } from "../../utils/createElementWithAttributes";
import { $ } from "../../utils/selectors";

const scrollToBottom = () => {
  const $scrollToBottom = createElementWithAttributes({
    tag: "button",
    className: "scroll-to-bottom",
    textContent: "⬇",
  });

  $scrollToBottom.addEventListener("click", () => {
    const $movieContainer = $(".movie-container");
    if (!$movieContainer) {
      return;
    }

    window.scrollTo({
      top: $movieContainer.scrollHeight * 0.85,
      behavior: "smooth",
    });
  });

  return $scrollToBottom;
};

export default scrollToBottom;
