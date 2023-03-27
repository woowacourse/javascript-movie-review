import BodyController from '../utils/bodyController';

class Modal {
  private $dialog: HTMLDialogElement | null;
  private $modalDrop: HTMLDivElement | null;

  constructor() {
    this.$dialog = document.querySelector<HTMLDialogElement>('#modal');
    this.$modalDrop = document.querySelector('.modal-backdrop');

    this.$modalDrop?.addEventListener('click', () => this.close());
    window.addEventListener('keyup', (event) => {
      if (event.defaultPrevented) return;
      if (event.key === 'Escape') this.close();
    });
  }

  getDialog() {
    return this.$dialog;
  }

  open() {
    if (!this.$dialog) return;
    if (typeof this.$dialog.showModal === 'function') {
      BodyController().addClass('scroll-lock');
      this.$dialog.showModal();
    }
  }

  close(isBack = false) {
    if (!this.$dialog) return;
    BodyController().removeClass('scroll-lock');

    this.$dialog.close();

    if (isBack) {
      history.back();
      return;
    }
    history.pushState('', '', '/');
  }
}

const modal = new Modal();

export default modal;
