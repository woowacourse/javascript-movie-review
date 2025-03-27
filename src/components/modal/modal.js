import { createElement } from "../../util/dom";
import { hideElement, showElement } from "../../view/InputView";

export default function Modal() {
  const $modalBackground = createElement("div", {
    className: ["modal-background", "active", "hide"],
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

  const $modalContainer = createElement("div", {
    className: "modal-container",
  });

  $closeButton.append($closeImg);
  $modal.append($closeButton, $modalContainer);
  $modalBackground.append($modal);

  function render(modalElement) {
    $modalContainer.append(modalElement ?? "");
  }

  function hide() {
    hideElement($modalBackground);
  }

  function show() {
    showElement($modalBackground);
  }

  return { $el: $modalBackground, render, hide, show };
}
