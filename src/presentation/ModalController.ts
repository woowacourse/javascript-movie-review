import { MovieDetail } from '../../types/MovieDetail.ts';
import { MovieSelection } from '../domain/MovieSelection.ts';
import { fetchMovieDetail } from '../movieAPIResponse.ts';
import { renderCustomRating } from './CustomRatingRender.ts';
import { CustomRatingRepository } from './CustomRatingRepository.ts';
import { localStorageRatingStorage } from './LocalStorageRatingStorage.ts';
import { renderModal } from './ModalRenderer.ts';
import { showError } from './MovieRenderer.ts';

const selection = new MovieSelection();
const ratingRepository = new CustomRatingRepository(localStorageRatingStorage);

const handleSuccess = (detail: MovieDetail) => {
  const savedRating = ratingRepository.getCustomRate(detail.id);
  selection.select(detail, savedRating);
  renderModal(selection);
  renderCustomRating(selection.rating);
};

const handleError = (error: unknown) => {
  showError(error);
};

export const openModal = async (id: number) => {
  try {
    const detail = await fetchMovieDetail(id);
    handleSuccess(detail);
  } catch (error) {
    handleError(error);
  }
};

export const rateMovie = (rating: number) => {
  const movieId = selection.selected?.id;
  if (!movieId) return;
  selection.rate(rating);
  try {
    ratingRepository.saveCustomRate(movieId, rating);
  } catch {
    handleError('[ERROR]별점 저장에 실패했습니다.');
  }
  renderCustomRating(selection.rating);
};

export const closeModal = () => {
  selection.close();
  renderModal(selection);
};
