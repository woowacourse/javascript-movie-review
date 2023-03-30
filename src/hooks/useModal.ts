import { useState } from '../core';
import { body, html } from '../utils/common/domHelper';

function useModal(initial: boolean): [Boolean, VoidFunction, VoidFunction] {
  const [isOpen, setIsOpen] = useState(initial);

  const onKeyDownEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };

  const openModal = () => {
    setIsOpen(true);

    body.style.overflowY = 'hidden';
    html.style.overflowY = 'hidden';
    window.addEventListener('keydown', onKeyDownEscape);
  };

  const closeModal = () => {
    setIsOpen(false);

    body.style.overflowY = 'auto';
    html.style.overflowY = 'auto';
    window.removeEventListener('keydown', onKeyDownEscape);
  };

  return [isOpen, openModal, closeModal];
}

export { useModal };
