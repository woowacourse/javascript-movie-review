import { useState } from '../core';

function useModal(initial: boolean): [Boolean, VoidFunction, VoidFunction] {
  const [isOpen, setIsOpen] = useState(initial);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflowY = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflowY = 'auto';
  };

  return [isOpen, openModal, closeModal];
}

export { useModal };
