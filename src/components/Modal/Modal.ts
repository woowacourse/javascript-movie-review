import './style.css';

import Image from '../Image/Image';
import close from '../../imgs/close.svg';

interface ModalProps {
  content: HTMLElement;
}

class Modal {
  private template: HTMLDivElement;

  constructor(props: ModalProps) {
    this.template = this.createElements(props);
    this.onEscapeKeydown();
  }

  private createElements({ content }: ModalProps) {
    const modal = this.createModal();
    modal.appendChild(this.createModalBackdrop());
    modal.appendChild(this.createModalContainer(content));
    return modal;
  }

  private createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    return modal;
  }

  private createModalBackdrop() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.addEventListener('click', this.toggleModal.bind(this));
    return backdrop;
  }

  private createModalContainer(content: HTMLElement) {
    const container = document.createElement('section');
    container.className = 'modal-container';
    container.addEventListener('click', (event) => event.stopPropagation());
    container.appendChild(this.createCloseIcon());
    container.appendChild(content);
    return container;
  }

  private createCloseIcon() {
    const closeIcon = new Image({
      src: close,
      classname: ['modal-close-button'],
      alt: 'close-icon',
      onImageClick: this.toggleModal.bind(this),
    });
    return closeIcon.element;
  }

  toggleModal() {
    this.template.classList.toggle('modal--open');
  }

  onEscapeKeydown() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.template.classList.remove('modal--open');
      }
    });
  }

  get element() {
    return this.template;
  }
}

export default Modal;
