import { MovieSelection } from '../domain/MovieSelection.ts';
import { fetchMovieDetail } from '../movieAPIResponse.ts';
import { renderModal } from './ModalRenderer.ts';
import { showError } from './MovieRenderer.ts';

const selection = new MovieSelection();

export const openModal = async (id: number) => {
  try {
    const detail = await fetchMovieDetail(id);
    selection.select(detail);
    renderModal(selection);
  } catch (error) {
    showError(error);
  }
};

export const closeModal = () => {
  selection.close();
  renderModal(selection);
};
