/* eslint-disable max-lines-per-function */
import closeImg from "../../templates/close-button.png";
import { createElementWithAttribute } from "../utils";

export function handleCloseModal() {
  console.log("closeModal");
  const $modal = document.querySelector(".detail-modal");
  if (!$modal) return;
  $modal.remove();
  document.body.style.overflow = "";
}

const CloseButton = () => {
  const $button = createElementWithAttribute("button", {
    class: "close-button",
  });
  const $img = createElementWithAttribute("img", {
    src: closeImg,
  });
  $button.appendChild($img);

  $button.addEventListener("click", () => {
    handleCloseModal();
  });

  return $button;
};

export default CloseButton;
