import Modal from '../Modal';
import { MoveDetailType } from '../../type';
import { $ } from '../../util/selector';

export const renderModal = async () => {
  document.body?.appendChild(Modal());
};

export const updateModalData = (movieDetail: MoveDetailType) => {
  const posterElement = $('#movieDetailPoster');
  if (posterElement instanceof HTMLImageElement) {
    posterElement.src = `https://image.tmdb.org/t/p/original/${movieDetail.posterPath}`;
    posterElement.alt = `${movieDetail.title} 포스터 이미지`;
  }

  const titleElement = $('#movieDetailTitle');
  if (titleElement instanceof HTMLElement) {
    titleElement.textContent = movieDetail.title;
  }

  const genresElement = $('#movieDetailGenres');
  if (genresElement instanceof HTMLElement) {
    const genre = movieDetail.genres.map((genre) => genre.name).join(', ');
    const releaseYear = movieDetail.releaseDate.substring(0, 4);
    genresElement.textContent = `${releaseYear} · ${genre}`;
  }

  const averageElement = $('#movieAverage');
  if (averageElement instanceof HTMLElement) {
    averageElement.textContent = movieDetail.voteAverage.toFixed(1).toString();
  }

  const plotElement = $('#plot');
  if (plotElement instanceof HTMLElement) {
    plotElement.textContent = movieDetail.overview;
  }
};
