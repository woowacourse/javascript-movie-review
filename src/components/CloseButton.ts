/* eslint-disable max-lines-per-function */
import closeImg from "../../templates/close-button.png";
import { createElementWithAttribute } from "../utils";

function closeModal() {
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
    closeModal();
  });

  return $button;
};

export default CloseButton;
