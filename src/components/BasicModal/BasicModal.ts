import './BasicModal.css';

class BasicModal {
  children: HTMLElement;
  backdropElement: HTMLElement;
  modalContainer: HTMLElement;
  modalBox = document.createElement('div');

  constructor(children: HTMLElement) {
    this.backdropElement = document.querySelector('.modal-backdrop')!;
    this.modalContainer = document.querySelector('.modal-container')!;
    this.children = children;

    this.modalContainer.append(this.children);
    this.setEvent();
  }

  render() {
    this.modalContainer.append(this.children);
  }

  setEvent(): void {
    this.blockModalBodyScroll();

    this.backdropElement.addEventListener('click', event => {
      if (event.target === event.currentTarget) {
        BasicModal.closeModal();
        this.resetBodyScroll();
      }
    });

    window.addEventListener('keydown', e => {
      this.escKeyModalClose(e);
    });
  }

  escKeyModalClose(e: KeyboardEvent) {
    if (e.keyCode === 27) {
      BasicModal.closeModal();
    }
  }

  static closeModal() {
    const backdropElement = document.querySelector('.modal-backdrop');
    if (!backdropElement) return;
    backdropElement.classList.remove('modal-open');
    document.body.style.overflowY = 'auto';
  }

  blockModalBodyScroll() {
    if (this.backdropElement.classList.contains('modal')) {
      document.body.style.overflowY = 'hidden';
    }
  }

  resetBodyScroll() {
    document.body.style.overflowY = 'auto';
  }
}
export default BasicModal;
