import { createButton } from "./button";

export function createDetailButton(): HTMLButtonElement {
  return createButton({
    text: "자세히 보기",
    width: "fit",
    size: "s",
    onClick: () => {},
  });
}
