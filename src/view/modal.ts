import fetchMovieDetail, { IMovieDetailResponse } from '../api/fetchMovieDetail';

import addHoverEventToStar from '../css/userStarCss';
import { createMovieDetailContainer } from './modal/movieDetail';

export function closeModal() {
  const modal = document.getElementById('movie-detail-modal') as HTMLDialogElement;
  document.body.classList.remove('no-scroll-y');
  modal.innerHTML = '';
  modal.close();
}

const backDropClickHandler = (event: any) => {
  const DIALOG_TAGNAME = 'DIALOG';
  if (event.target.tagName === DIALOG_TAGNAME) {
    closeModal();
  }
};

function createNewModal() {
  const newModal = document.createElement('dialog');
  newModal.id = 'movie-detail-modal';
  newModal.addEventListener('click', (e) => backDropClickHandler(e));
  document.body.append(newModal);
  return newModal;
}

function getClearModal() {
  const originalModal = document.getElementById('movie-detail-modal') as HTMLDialogElement;
  if (!originalModal) {
    const newModal = createNewModal();
    return newModal;
  }
  originalModal.innerHTML = '';
  return originalModal;
}

export async function renderMovieDetailModal(id: number) {
  const modal = getClearModal();
  // TODO: 스켈레톤 UI 렌더링
  const movieResponse: IMovieDetailResponse = await fetchMovieDetail(id);
  // TODO: fetching 이후 스켈레톤 UI replace해주기.
  modal.append(createMovieDetailContainer(movieResponse));
  document.body.classList.add('no-scroll-y');
  modal.showModal();
  addHoverEventToStar();
}
