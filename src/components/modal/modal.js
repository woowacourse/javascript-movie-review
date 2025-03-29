import { createElement } from "../../util/dom";
import { hideElement, showElement } from "../../view/InputView";
import { $ } from "../../util/querySelector";

export default function Modal($modalElement) {
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

  function render() {
    $("#wrap").append($modalBackground);
  }

  function close() {
    $modalBackground.remove();
  }

  $modalBackground.addEventListener("click", (e) => {
    if (e.target.id === "modalBackground") close();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });

  $closeButton.addEventListener("click", close);

  render();
}
