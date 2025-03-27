export const openModal = (content: HTMLElement) => {
  const $modal = document.querySelector(".modal") as HTMLDialogElement;
  const $modalContent = $modal.querySelector(".modal-content") as HTMLElement;
  $modalContent.replaceChildren(content);
  $modal.showModal();
};

const closeModal = () => {
  const $modal = document.querySelector(".modal") as HTMLDialogElement;
  $modal.close();
};

const handleModalClick = (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  const $closeModalButton = target.closest(".close-modal");
  if (target.classList.contains("modal") || $closeModalButton) {
    closeModal();
  }
};

const $Modal = () => {
  const $modal = createElement("dialog", {
    className: "modal",
  });
  const $closeButton = createElement("button", {
    type: "button",
    className: "close-modal",
  });
  $closeButton.appendChild(
    createElement("img", { src: "./modal_button_close.png", alt: "모달 닫기" })
  );
  const $modalContent = createElement("div", {
    className: "modal-content",
  });
  $modal.append($closeButton, $modalContent);

  $modal.addEventListener("click", handleModalClick);

  return $modal;
};

export default $Modal;
