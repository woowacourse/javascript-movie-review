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
        this.closeModal();
        this.resetBodyScroll();
      }
    });
  }

  closeModal() {
    this.backdropElement.classList.remove('modal-open');
  }

  blockModalBodyScroll() {
    if (this.backdropElement.classList.contains('modal-open')) {
      document.body.style.overflow = 'hidden';
    }
  }

  resetBodyScroll() {
    document.body.style.overflow = 'auto';
  }
}
export default BasicModal;
