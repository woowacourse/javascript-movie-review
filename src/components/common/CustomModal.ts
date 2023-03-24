import { $, dispatchCustomEvent } from "../../utils/dom";

class CustomModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
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
    const modal = this.querySelector<HTMLDialogElement>(".modal");

    modal?.showModal();
  }

  closeModal() {
    const modal = this.querySelector<HTMLDialogElement>(".modal");

    modal?.close();
  }
}

interface CustomModal {
  "custom-modal": typeof CustomModal;
}

customElements.define("custom-modal", CustomModal);

export default CustomModal;
