import { getMovieDetails } from "../api/getMovieDetails";
import { errorMovieDetail } from "../services/errorMovieDetail";
import { modalView } from "../view/modalView";
import { currentMovieModal } from "../model/currentMovieModel";

export async function handleModal(clickedMovieId: string) {
  const movieDetailsData = await getMovieDetails(Number(clickedMovieId));

  if (!movieDetailsData.success) {
    errorMovieDetail(movieDetailsData.error);
    return;
  };

  modalView.renderMovieDetail(movieDetailsData.data);
  currentMovieModal.currentMovieId = movieDetailsData.data.id;
};
