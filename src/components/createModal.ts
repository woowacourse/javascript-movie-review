const createModal = () => {
  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-modal");
  closeButton.innerHTML = `<img src="images/modal_button_close.png" />`;

  const closeModal = () => {
    modalBackground.classList.remove("active");
    document.body.classList.remove("modal-open");
  };

  const openModal = () => {
    modalBackground.classList.add("active");
    document.body.classList.add("modal-open");
  };

  closeButton.addEventListener("click", closeModal);

  modalBackground.addEventListener("click", (event) => {
    if (event.target === modalBackground) {
      closeModal();
    }
  });

  modal.appendChild(closeButton);
  modalBackground.appendChild(modal);
  document.body.appendChild(modalBackground);

  return {
    show: openModal,
    hide: closeModal,
    setContent: (content: string) => {
      modal.innerHTML = content;
      modal.prepend(closeButton);
    },
  };
};

export default createModal;
