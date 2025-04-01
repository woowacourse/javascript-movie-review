import Modal from '../Modal';
import { MovieDetailType } from '../../type';
import { $ } from '../../util/selector';
import { hideModalSkeletons, modalSkeletons } from './skeleton/modalSkeleton';

function waitForImageLoad(img: HTMLImageElement): Promise<void> {
  return new Promise((resolve) => {
    if (img.complete) resolve();
    else {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    }
  });
}

export const renderModal = async (movieDetail: MovieDetailType) => {
  const modal = Modal(movieDetail) as HTMLDialogElement;
  const poster = modal.querySelector('#movieDetailPoster') as HTMLImageElement;

  modalSkeletons();
  await waitForImageLoad(poster);

  document.body.appendChild(modal);
  modal.showModal();

  hideModalSkeletons();

  modal?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      modal?.close();
      modal.remove();
    }
  });

  modal?.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
      modal?.close();
      modal.remove();
    }
  });

  $('#closeModal')?.addEventListener('click', () => {
    modal?.close();
    modal.remove();
  });
};
