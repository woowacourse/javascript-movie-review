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
  bindBackgroundClick($modal);
  bindEscapeKey($modal);
  bindCloseButton($modal);
}

function bindBackgroundClick($modal) {
  $modal.addEventListener("click", (e) => {
    if (e.target.id === "modalBackground") closeModal($modal);
  });
}

function bindEscapeKey($modal) {
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal($modal);
  });
}

function bindCloseButton($modal) {
  const $closeButton = $modal.querySelector("#closeModal");
  if ($closeButton) {
    $closeButton.addEventListener("click", () => closeModal($modal));
  }
}

function closeModal($modal) {
  $modal.remove();
}
