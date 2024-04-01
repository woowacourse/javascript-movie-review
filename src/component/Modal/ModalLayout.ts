import { closeModal } from './Modal';

function createModalContainer() {
  const container = document.createElement('div');
  container.className = 'modal-container';

  return container;
}

function createModalBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  return backdrop;
}

export { createModalContainer, createModalBackdrop };
