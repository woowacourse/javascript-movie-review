import { $ } from "../../utils/dom";

class CustomModal extends HTMLElement {
  modal;

  constructor() {
    super();

    this.render();
    this.addEvent();

    this.modal = <HTMLDialogElement>this.querySelector(".modal");
  }

  render() {
    this.innerHTML = /* html */ `
      <dialog class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <button id="close-button">X</button>
          <movie-detail></movie-detail>
        </div>
      </dialog>`;
  }

  addEvent() {
    $(".modal-backdrop", this)?.addEventListener("click", () =>
      this.closeModal()
    );
    $("#close-button", this)?.addEventListener("click", () =>
      this.closeModal()
    );
  }

  openModal() {
    this.modal.showModal();
  }

  closeModal() {
    this.modal.close();
  }
}

interface CustomModal {
  "custom-modal": typeof CustomModal;
}

customElements.define("custom-modal", CustomModal);

export default CustomModal;
