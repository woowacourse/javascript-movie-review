import MovieModal from "./MovieModal";
import { $ } from "../../utils/selector"

export const onClickModalCloseButton = () => {
  $('#modal-close-button').addEventListener('click', () => {
    const movieModal = $('#movie-modal') as MovieModal;
    movieModal.close();
  })
}
