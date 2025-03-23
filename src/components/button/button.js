import { createElement } from "../../util/dom";

export default function Button({ className, placeholder, onClick, id }) {
  const $button = createElement("button", { className, id });
  $button.textContent = placeholder;
  $button.addEventListener("click", onClick);
  return $button;
}
