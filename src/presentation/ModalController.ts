import { MovieSelection } from '../domain/MovieSelection.ts';
import { fetchMovieDetail } from '../movieAPIResponse.ts';
import { renderCustomRating } from './CustomRatingRender.ts';
import { getCustomRate, saveCustomRate } from './CustomRatingRepository.ts';
import { renderModal } from './ModalRenderer.ts';
import { showError } from './MovieRenderer.ts';

const selection = new MovieSelection();

export const openModal = async (id: number) => {
  try {
    const detail = await fetchMovieDetail(id);
    selection.select(detail);
    const customRate = getCustomRate(id)
    renderModal(selection,customRate);
    renderCustomRating(customRate)
  } catch (error) {
    showError(error);
  }
};

export const rateMovie = (rating: number) => {
  const movieId = selection.selected?.id;
  if (!movieId) return;
  saveCustomRate(movieId, rating);
  renderCustomRating(rating);
};

export const closeModal = () => {
  selection.close();
  renderModal(selection,null);
};
