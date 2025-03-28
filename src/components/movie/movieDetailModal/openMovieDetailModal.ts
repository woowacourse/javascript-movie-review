import showMovieDetailModal from "./internal/showMovieDetailModal";
import updateMovieDetailModal from "./internal/updateMovieDetailModal";

const openMovieDetailInfo = async (event: MouseEvent) => {
  const isUpdateCompleted = await updateMovieDetailModal(event);
  if (!isUpdateCompleted) {
    return;
  }

  showMovieDetailModal();
};

export default openMovieDetailInfo;
