import fetchMovieDetail, { IMovieDetailResponse } from '../api/fetchMovieDetail';
import { cacheingMovieDetailInLocalStorage, getCachedMovieDetail } from '../store/localStorage';

import { createMovieDetailContainer } from './modal/movieDetail';
import createMovieDetailSkeleton from './modal/movieDetailSkeleton';

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
    return createNewModal();
  }
  originalModal.innerHTML = '';
  return originalModal;
}

async function getMovieDetail(id: number) {
  const { data: cachedData } = getCachedMovieDetail(id);
  if (cachedData) return cachedData;
  const movieResponse: IMovieDetailResponse = await fetchMovieDetail(id);
  cacheingMovieDetailInLocalStorage(movieResponse);
  return movieResponse;
}

export async function renderMovieDetailModal(id: number) {
  const modal = getClearModal();
  const movieDetailSkeleton = createMovieDetailSkeleton();
  modal.append(movieDetailSkeleton);
  document.body.classList.add('no-scroll-y');
  modal.showModal();
  const movieResponse = await getMovieDetail(id);
  movieDetailSkeleton.replaceWith(createMovieDetailContainer(movieResponse));
}
