import { toggleVisibility } from "../../utils/Render";
import setPageScroll from "../../utils/setPageScroll";
import { $modal, $modalCloseButton, $modalContainer } from "./Element";

const escapeEventListener = (e: KeyboardEvent) => {
  const targetKey = e.key;
  if (targetKey !== "Escape") return;
  Modal.hidden();
};

const Modal = {
  init() {
    $modal.addEventListener("click", (e) => {
      if (e.target === $modal) this.hidden();
    });
    $modalCloseButton.addEventListener("click", () => this.hidden());
  },

  setContent(element: HTMLElement) {
    $modalContainer.replaceChildren();
    $modalContainer.appendChild(element);
  },

  show() {
    toggleVisibility($modal, "show");
    setPageScroll(false);
    addEventListener("keydown", escapeEventListener);
  },

  hidden() {
    toggleVisibility($modal, "hidden");
    setPageScroll(true);
    removeEventListener("keydown", escapeEventListener);
  },
};

export default Modal;
