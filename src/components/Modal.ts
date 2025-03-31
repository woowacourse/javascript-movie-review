const createModal = () => {
  const modalBackground = document.createElement("div");
  modalBackground.classList.add("modal-background");

  const modal = document.createElement("div");
  modal.classList.add("modal");

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-modal");
  closeButton.innerHTML = `<img src="images/modal_button_close.png" />`;

  closeButton.addEventListener("click", () => {
    modalBackground.classList.remove("active");
    document.body.classList.remove("modal-open");
  });

  modalBackground.addEventListener("click", (event) => {
    if (event.target === modalBackground) {
      modalBackground.classList.remove("active");
      document.body.classList.remove("modal-open");
    }
  });

  modal.appendChild(closeButton);
  modalBackground.appendChild(modal);

  document.body.appendChild(modalBackground);

  return {
    show: () => {
      modalBackground.classList.add("active");
      document.body.classList.add("modal-open");
    },
    hide: () => {
      modalBackground.classList.remove("active");
      document.body.classList.remove("modal-open");
    },
    setContent: (content: string) => {
      modal.innerHTML = content;
      modal.prepend(closeButton);
    },
  };
};

export default createModal;
