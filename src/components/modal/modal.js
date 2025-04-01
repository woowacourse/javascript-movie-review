import { createElement } from "../../util/dom";
import { $ } from "../../util/querySelector";

export default function Modal($modalElement) {
  const $modal = createModal($modalElement);
  bindCloseEvent($modal);
  mountModal($modal);
}

function createModal($modalElement) {
  const $modalBackground = createModalBackground();
  const $modal = createModalContainer();
  const $closeButton = createCloseButton();
  const $closeImg = createCloseImg();

  $closeButton.append($closeImg);
  $modal.append($closeButton, $modalElement);
  $modalBackground.append($modal);

  return $modalBackground;
}

function createModalBackground() {
  return createElement("div", {
    className: ["modal-background", "active"],
    id: "modalBackground",
  });
}

function createModalContainer() {
  return createElement("div", {
    className: "modal",
  });
}

function createCloseButton() {
  return createElement("button", {
    className: "close-modal",
    id: "closeModal",
  });
}

function createCloseImg() {
  return createElement("img", {
    src: "./images/modal_button_close.png",
  });
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

function mountModal($modal) {
  $("#wrap").append($modal);
}
