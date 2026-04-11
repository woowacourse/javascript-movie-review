import { getMovieDetails } from "../api/getMovieDetails";
import { errorMovieDetail } from "../services/errorMovieDetail";
import { modalView } from "../view/modalView";
import { currentMovieModel } from "../model/currentMovieModel";
import { myStarRatingView } from "../view/myStarRatingView";

export async function handleModal(clickedMovieId: string) {
  const movieDetailsData = await getMovieDetails(Number(clickedMovieId));

  if (!movieDetailsData.success) {
    errorMovieDetail(movieDetailsData.error);
    return;
  };

  modalView.renderMovieDetail(movieDetailsData.data);
  currentMovieModel.currentMovieId = movieDetailsData.data.id;
  
  const myStarRating: number | undefined = await currentMovieModel.getRating();
  myStarRatingView.renderRating(myStarRating || 0);
};
