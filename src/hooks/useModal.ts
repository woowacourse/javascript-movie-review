import { useState } from '../core';

function useModal(initial: boolean): [Boolean, VoidFunction, VoidFunction] {
  const [isOpen, setIsOpen] = useState(initial);

  const onKeyDownEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflowY = 'hidden';
    window.addEventListener('keydown', onKeyDownEscape);
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflowY = 'auto';
    window.removeEventListener('keydown', onKeyDownEscape);
  };

  return [isOpen, openModal, closeModal];
}

export { useModal };
