import { getMovieDetails } from "../api/getMovieDetails";
import { errorMovieDetail } from "../services/errorMovieDetail";
import { modalView } from "../view/modalView";

export async function handleModal(clickedMovieId: string) {
  const movieDetailsData = await getMovieDetails(Number(clickedMovieId));

  if (!movieDetailsData.success) {
    errorMovieDetail(movieDetailsData.error);
    return;
  };

  modalView.renderMovieDetail(movieDetailsData.data);
};
