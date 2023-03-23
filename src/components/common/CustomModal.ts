import { $ } from '../../utils/domUtils';

class CustomModal extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = /* html */ `
    <dialog class="modal">
      <div class="modal-backdrop"></div>
      <div class="modal-container"></div>
    </dialog>
    `;
  }

  connectedCallback() {
    $('.modal-backdrop')?.addEventListener('click', () => this.closeModal());
  }

  openModal() {
    const $modal = $('.modal') as HTMLDialogElement;

    if (!$modal) return;

    $modal.showModal();
  }

  closeModal() {
    const $modal = $('.modal') as HTMLDialogElement;

    if (!$modal) return;

    $modal.close();
  }
}

export default CustomModal;
