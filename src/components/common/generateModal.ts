import createElement from "../utils/createElement";

const generateModal = ({
  children,
  closeModal,
}: {
  children: HTMLElement[];
  closeModal: () => void;
}) => {
  const backDrop = createElement({
    tagName: "div",
    attribute: { class: "modal-backdrop" },
  });
  const container = createElement({
    tagName: "div",
    attribute: { class: "modal-container" },
    children: [...children],
  });
  const modalDiv = createElement({
    tagName: "div",
    attribute: { class: "modal" },
    children: [backDrop, container],
  });

  backDrop.addEventListener("click", () => {
    closeModal();
  });

  const handleEscKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
    document.removeEventListener("keydown", handleEscKey);
  };

  document.addEventListener("keydown", handleEscKey);

  return modalDiv;
};

export default generateModal;
