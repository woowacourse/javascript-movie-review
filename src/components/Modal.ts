class Modal {
  #$dialog: HTMLDialogElement | null;
  #$modalDrop: HTMLDivElement | null;

  constructor() {
    this.#$dialog = document.querySelector<HTMLDialogElement>('#modal');
    this.#$modalDrop = document.querySelector('.modal-backdrop');

    this.#$modalDrop?.addEventListener('click', () => this.close());
  }

  getDialog() {
    return this.#$dialog;
  }

  open() {
    if (!this.#$dialog) return;
    if (typeof this.#$dialog.showModal === 'function') {
      this.#$dialog.showModal();
      document.body.classList.add('scroll-lock');
    }
  }

  close(isBack = false) {
    if (!this.#$dialog) return;
    this.#$dialog.close();
    document.body.classList.remove('scroll-lock');
    if (isBack) {
      history.back();
      return;
    }
    history.pushState('', '', '/');
  }
}

const modal = new Modal();

export default modal;
