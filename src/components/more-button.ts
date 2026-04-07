import { createButton } from "./button";

export function createMoreButton(onClick: () => void): HTMLButtonElement {
  return createButton({ text: "더 보기", width: "full", size: "m", onClick });
}
