import './BasicModal.css';

class BasicModal {
  children: HTMLElement;
  modalBox = document.createElement('div');
  backdropElement: HTMLElement;
  modalContainer: HTMLElement;
  //children: Node, position: 'bottom' | 'center'
  constructor(children: HTMLElement) {
    this.backdropElement = document.querySelector('.modal-backdrop')!;
    this.modalContainer = document.querySelector('.modal-container')!;
    this.children = children;
    // this.#position = position;
    this.render();
    this.setEvent();
  }

  render() {
    this.modalBox.classList.add('modal-center');
    this.backdropElement.classList.add('hidden');
    this.modalBox.append(this.children);

    this.modalContainer.append(this.modalBox);
    // this.backdropElement = document.querySelector('.modal-backdrop')!;
    // this.modalContainer = document.querySelector('.modal-container')!;
    // this.#addBackDrop();
    // modalContainer.append(this.modalBox);

    // this.#addModalContainer();
    // blockModalBodyScroll();
  }

  setEvent(): void {
    this.blockModalBodyScroll();
    // this.#backdropElement.addEventListener('click', () => {
    //   this.#position === 'bottom' && closeModal();
    //   resetBodyScroll();
    // });
  }

  #addModalContainer() {
    // const modalContainerElement = document.createElement('div');
    // if (this.#position === 'center') {
    //   modalContainerElement.classList.add('modal-center');
    // }
    // if (this.#position === 'bottom') {
    //   modalContainerElement.classList.add('modal-container');
    // }
    // modalContainerElement.append(this.#children);
    // this.append(modalContainerElement);
  }

  // #addBackDrop() {
  //   this.#backdropElement.classList.add('modal-backdrop');
  //   this.append(this.#backdropElement);
  // }

  // closeModal() {
  //   // hideErrorMessage();
  //   const $modal = document.querySelector('.modal');
  //   if (!$modal) return;

  //   $modal.classList.remove('modal--open');
  //   resetBodyScroll();
  // }

  // openModal = (modalType: 'add' | 'detail') => {
  //   if (modalType === 'add') {
  //     $('#add-modal').classList.add('modal--open');
  //   }
  //   if (modalType === 'detail') {
  //     $('#detail-modal').classList.add('modal--open');
  //   }
  //   blockModalBodyScroll();
  // };

  blockModalBodyScroll = () => {
    if (this.modalContainer.classList.contains('modal-open')) {
      document.body.style.overflow = 'hidden';
    }
  };

  resetBodyScroll = () => {
    document.body.style.overflow = 'auto';
  };
}
export default BasicModal;
