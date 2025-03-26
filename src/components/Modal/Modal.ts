import { toggleVisibility } from "../../utils/Render";
import setPageScroll from "../../utils/setPageScroll";
import { $modal, $modalCloseButton } from "./Element";

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
