import createElement from "../../../utils/createElement";

const createModal = (closeModalFunc?: () => void) => {
  const modalBox = createElement({
    tagName: "div",
    attrs: {
      class: "modal-box",
    },
  });

  const modalBackdrop = createElement({
    tagName: "div",
    attrs: {
      class: "modal-backdrop",
    },
  });

  if (closeModalFunc) {
    modalBackdrop.addEventListener("click", closeModalFunc);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeModalFunc();
    });
  }

  modalBox.append(modalBackdrop);

  return modalBox;
};

export default createModal;
