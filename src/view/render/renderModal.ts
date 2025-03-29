import Modal from '../Modal';
import { MoveDetailType } from '../../type';
import { $ } from '../../util/selector';

export const renderModal = (movieDetail: MoveDetailType) => {
  document.body?.appendChild(Modal(movieDetail));

  const modal = $('#modal') as HTMLDialogElement;
  modal?.showModal();

  modal?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      modal?.close();
      modal.remove();
    }
  });

  $('#closeModal')?.addEventListener('click', () => {
    modal?.close();
    modal.remove();
  });
};
