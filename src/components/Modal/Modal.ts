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
    this.setEscapeKeyDownListener();
  }

  private createElements({ content }: ModalProps) {
    const modal = this.createModal();
    modal.appendChild(this.createModalDimmedLayer());
    modal.appendChild(this.createModalContainer(content));
    return modal;
  }

  private createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    return modal;
  }

  private createModalDimmedLayer() {
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-dimmed-layer';
    backdrop.addEventListener('click', this.closeModal.bind(this));
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
      onImageClick: this.closeModal.bind(this),
    });
    return closeIcon.element;
  }

  openModal() {
    this.template.classList.add('modal--open');
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'hidden';
  }

  closeModal() {
    this.template.classList.remove('modal--open');
    const body = document.querySelector('body') as HTMLBodyElement;
    body.style.overflowY = 'auto';
  }

  private setEscapeKeyDownListener() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  get element() {
    return this.template;
  }
}

export default Modal;
