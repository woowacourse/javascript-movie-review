function closeModal() {
  const modal = document.getElementById('movie-detail-modal') as HTMLDialogElement;
  document.body.classList.remove('no-scroll-y');
  modal.close();
}

function createMovieDetailContainer() {
  const container = document.createElement('div');
  container.classList.add('movie-modal');
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
