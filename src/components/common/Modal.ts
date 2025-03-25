import { Box } from './Box';

export const Modal = (content: HTMLElement) => {
  const modalBackground = Box({
    classList: ['modal-background', 'active'],
    props: {
      children: [
        Box({
          classList: ['modal'],
          props: {
            children: [content],
          },
        }),
      ],
    },
  });

  const closeModal = () => {
    modalBackground.classList.remove('active');
    modalBackground.addEventListener('transitionend', () => {
      modalBackground?.remove();
    });
  };

  const handleModalClickClose = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('modal-background')) {
      closeModal();
    }
  };

  const handleModalEscClose = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  modalBackground.addEventListener('click', handleModalClickClose);
  document.addEventListener('keydown', handleModalEscClose);

  return modalBackground;
};
