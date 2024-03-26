import isHTMLElement from '../../utils/isHTMLElement';
import createElement from '../../utils/createElement';

export const initializeModalContent = () => {
  const modal = document.getElementById('modal');
  if (!isHTMLElement(modal)) return;
  modal.innerHTML = '';
};

const createModalContainer = () => {
  const modalBackdrop = createElement('div', { className: 'modal-backdrop' });
  const modalContainer = createElement('div', { className: 'modal-container' });
  modalBackdrop.appendChild(modalContainer);

  return modalBackdrop;
};

const renderModalContainer = () => {
  const modal = document.getElementById('modal');
  if (!isHTMLElement(modal)) return;
  const modalContainer = createModalContainer();

  modal.appendChild(modalContainer);
};

export default renderModalContainer;
