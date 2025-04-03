import showErrorContainer from "../../errorContainer/showErrorContainer";
import showMovieDetailModal from "./internal/showMovieDetailModal";
import updateMovieDetailModal from "./internal/updateMovieDetailModal";

const openMovieDetailInfo = async (event: MouseEvent) => {
  try {
    const isUpdateCompleted = await updateMovieDetailModal(event);
    if (!isUpdateCompleted) {
      return;
    }

    showMovieDetailModal();
  } catch (error) {
    showErrorContainer(error);
  }
};

export default openMovieDetailInfo;
