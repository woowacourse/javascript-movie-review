import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import { $ } from "../utils/selectors";

export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    const $main = $("main");
    $main?.replaceChildren();

    const $backgroundContainer = $(".background-container");
    $backgroundContainer?.remove();

    const $errorContainer = createElementWithAttributes({
      tag: "div",
      className: "error-container",
      children: [
        { tag: "h1", textContent: `${error.message} 새로고침 해주세요!` },
      ],
    });

    $main?.append($errorContainer);
  }
};
