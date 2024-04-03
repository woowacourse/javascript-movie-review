import closeImg from "../../templates/close-button.png";
import { createElementWithAttribute } from "../utils";

export function handleCloseModal() {
  const $modal = document.querySelector(".detail-modal");

  if (!$modal) return;
  $modal.remove();

  document.body.classList.remove("modal-open");
}

const $CloseButtonImg = createElementWithAttribute("img", {
  src: closeImg,
});

const CloseButton = () => {
  const $button = createElementWithAttribute("button", {
    class: "close-button",
  });

  $button.appendChild($CloseButtonImg);
  $button.addEventListener("click", () => {
    handleCloseModal();
  });

  return $button;
};

export default CloseButton;
