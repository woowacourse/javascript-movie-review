import { createButton } from "./button";

export function createDetailButton(onClick: () => void): HTMLButtonElement {
  return createButton({
    text: "자세히 보기",
    width: "fit",
    size: "s",
    onClick,
  });
}
