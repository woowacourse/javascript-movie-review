import { createElement } from "../../util/dom";
import { $ } from "../../util/querySelector";

export default function Modal($modalElement) {
  const $modal = createModal($modalElement);
  bindCloseEvent($modal);
  mountModal($modal);
}

function createModal($modalElement) {
  const $modalBackground = createElement("div", {
    className: ["modal-background", "active"],
    id: "modalBackground",
  });

  const $modal = createElement("div", {
    className: "modal",
  });

  const $closeButton = createElement("button", {
    className: "close-modal",
    id: "closeModal",
  });

  const $closeImg = createElement("img", {
    src: "./images/modal_button_close.png",
  });

  $closeButton.append($closeImg);
  $modal.append($closeButton, $modalElement);
  $modalBackground.append($modal);

  return $modalBackground;
}

function mountModal($modal) {
  $("#wrap").append($modal);
}

function bindCloseEvent($modal) {
  const $closeButton = $modal.querySelector("#closeModal");
  $modal.addEventListener("click", (e) => {
    if (e.target.id === "modalBackground") close($modal);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close($modal);
  });

  $closeButton.addEventListener("click", () => close($modal));
}

function close($modal) {
  $modal.remove();
}
