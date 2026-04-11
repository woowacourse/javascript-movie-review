import type { MovieSelection } from '../domain/MovieSelection.ts';

const posterBaseURL = 'https://image.tmdb.org/t/p/original';

const showModal = () => {
  document.querySelector('#modalBackground')?.classList.add('active');
  document.body.classList.add('modal-open');
};

const hideModal = () => {
  document.querySelector('#modalBackground')?.classList.remove('active');
  document.body.classList.remove('modal-open');
};

export const renderModal = (state: MovieSelection, customRateNum : number | null) => {
  if (!state.isOpen) {
    hideModal();
    return;
  }

  const detail = state.selected!;

  const img = document.querySelector<HTMLImageElement>('.modal-image img');
  if (img) img.src = `${posterBaseURL}${detail.poster_path}`;

  const title = document.querySelector('.modal-description h2');
  if (title) title.textContent = detail.title;

  const category = document.querySelector('.modal-description .category');
  if (category) category.textContent = `${detail.release_date.slice(0, 4)} · ${detail.genres.map((g) => g.name).join(', ')}`;

  const rate = document.querySelector('#average-score')
  if (rate) rate.textContent = `${detail.vote_average.toFixed(1)}`

  const description = document.querySelector('.modal-description .detail');
  if (description) description.textContent = detail.overview;

  showModal();
};
