import { MovieSelection } from '../domain/MovieSelection.ts';
import { fetchMovieDetail } from '../movieAPIResponse.ts';
import { renderCustomRating } from './CustomRatingRender.ts';
import { CustomRatingRepository } from './CustomRatingRepository.ts';
import { localStorageRatingStorage } from './LocalStorageRatingStorage.ts';
import { renderModal } from './ModalRenderer.ts';
import { showError } from './MovieRenderer.ts';

const selection = new MovieSelection();
const ratingRepository = new CustomRatingRepository(localStorageRatingStorage);

export const openModal = async (id: number) => {
  try {
    const detail = await fetchMovieDetail(id);
    selection.select(detail);
    const customRate = ratingRepository.getCustomRate(id);
    renderModal(selection);
    renderCustomRating(customRate);
  } catch (error) {
    showError(error);
  }
};

export const rateMovie = (rating: number) => {
  const movieId = selection.selected?.id;
  if (!movieId) return;
  ratingRepository.saveCustomRate(movieId, rating);
  renderCustomRating(rating);
};

export const closeModal = () => {
  selection.close();
  renderModal(selection);
};
