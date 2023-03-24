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
      document.body.classList.add('scroll-lock');
      this.#$dialog.showModal();
    }
  }

  close(isBack = false) {
    if (!this.#$dialog) return;
    document.body.classList.remove('scroll-lock');
    this.#$dialog.close();

    if (isBack) {
      history.back();
      return;
    }
    history.pushState('', '', '/');
  }
}

const modal = new Modal();

export default modal;
