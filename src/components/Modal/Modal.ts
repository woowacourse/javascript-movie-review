import { toggleVisibility } from "../../utils/Render";
import setPageScroll from "../../utils/setPageScroll";
import {
  $modal,
  $modalBackground,
  $modalCloseButton,
  $modalContainer,
} from "./Element";

const escapeEventListener = (e: KeyboardEvent) => {
  const targetKey = e.key;
  if (targetKey !== "Escape") return;
  Modal.hidden();
};

const Modal = {
  init() {
    $modalBackground.addEventListener("click", (e) => {
      if (e.target === $modalBackground) this.hidden();
    });
    $modalCloseButton.addEventListener("click", () => this.hidden());
  },

  reset() {
    $modalContainer.replaceChildren();
  },

  setContent(element: HTMLElement) {
    this.reset();
    $modalContainer.appendChild(element);
  },

  show() {
    toggleVisibility($modalBackground, "show");
    setPageScroll(false);
    addEventListener("keydown", escapeEventListener);
    if (window.innerWidth < 1024)
      $modal.style.animation = "modal-up 0.5s forwards";
  },

  hidden() {
    toggleVisibility($modalBackground, "hidden");
    setPageScroll(true);
    removeEventListener("keydown", escapeEventListener);
    if (window.innerWidth < 1024) $modal.style.animation = "none";
  },
};

export default Modal;
