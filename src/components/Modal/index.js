class Modal {
  constructor() {
    this.modalBackground = document.querySelector("#modal-background");
    this.closeButton = document.querySelector("#close-modal");
    this.modalContainer =
      this.modalBackground.querySelector(".modal-container");
    this.bindEvents();
  }

  bindEvents() {
    if (this.closeButton) {
      this.closeButton.addEventListener("click", this.close.bind(this));
    }
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
    this.modalBackground.addEventListener("click", (e) => {
      if (e.target === this.modalBackground) {
        this.close();
      }
    });
  }

  open(contentHTML) {
    this.modalContainer.innerHTML = contentHTML;
    this.modalBackground.classList.add("active");
  }

  close() {
    this.modalBackground.classList.remove("active");
  }
}

export default Modal;
