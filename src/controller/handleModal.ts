import { getMovieDetails } from "../api/getMovieDetails";
import { errorMovieDetail } from "../services/errorMovieDetail";
import { modalView } from "../view/modalView";
import { currentMovieModel } from "../model/currentMovieModel";
import { myStarRatingView } from "../view/myStarRatingView";

export async function handleModal(clickedMovieId: number) {
  try {
    modalView.renderSpinner();

    currentMovieModel.currentMovieId = clickedMovieId;
    const movieDetailsData = await getMovieDetails(clickedMovieId);

    if (!movieDetailsData.success) {
      errorMovieDetail(movieDetailsData.error);
      return;
    };

    modalView.renderMovieDetail(movieDetailsData.data);
    currentMovieModel.currentMovieId = movieDetailsData.data.id;
    
    const myStarRating: number | undefined = await currentMovieModel.getRating();
    myStarRatingView.renderRating(myStarRating || 0);
  } finally {
    modalView.removeSpinner();
  };
};
