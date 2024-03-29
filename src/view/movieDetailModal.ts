import XImage from '../assets/images/closeButton.svg';

function closeModal() {
  const modal = document.getElementById('movie-detail-modal') as HTMLDialogElement;
  document.body.classList.remove('no-scroll-y');
  modal.close();
}

function createMovieTitle() {
  const title = document.createElement('div');
  title.innerText = '영화제목';
  return title;
}

function createModalCloseButton() {
  const button = document.createElement('button');
  button.className = 'flex-center-aligned close-button transition-background';
  const closeImage = document.createElement('img');
  closeImage.src = XImage;
  closeImage.alt = 'close-button';
  closeImage.addEventListener('click', closeModal);
  button.append(closeImage);
  return button;
}

function createMovieDetailHeader() {
  const div = document.createElement('div');
  div.className = 'movie-detail-header flex-center-aligned';
  div.append(createMovieTitle(), createModalCloseButton());
  return div;
}

function createMovieDetailContainer() {
  const container = document.createElement('div');
  container.classList.add('movie-modal');
  const header = createMovieDetailHeader();
  container.append(header);
  return container;
}

const backDropClickHandler = (event: any) => {
  if (event.target.tagName === 'DIALOG') {
    closeModal();
  }
};

function appendNewModal(): HTMLDialogElement {
  const modal = document.createElement('dialog');
  modal.id = 'movie-detail-modal';
  document.body.append(modal);
  modal.addEventListener('click', (e) => backDropClickHandler(e));
  modal.appendChild(createMovieDetailContainer());
  return modal;
}

function renderMovieDetailModal() {
  const modal = (document.getElementById('movie-detail-modal') as HTMLDialogElement) || appendNewModal();
  document.body.classList.add('no-scroll-y');
  modal.showModal();
}

export default renderMovieDetailModal;
