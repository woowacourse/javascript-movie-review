import { fetchMovieDetail } from "../../../../domain/apis/fetchMovieDetail";
import { $ } from "../../../utils/selectors";
import movieDetailInfo from "../../movieDetailInfo";

const updateMovieDetailModal = async (event: MouseEvent) => {
  if (!event.target || event.currentTarget === event.target) {
    return false;
  }

  if (event.target instanceof HTMLElement === false) {
    return false;
  }

  const $movieItem = event.target.closest("li");
  if (!$movieItem) {
    return false;
  }

  const movieDetail = await fetchMovieDetail($movieItem.id);

  const $newMovieDetailInfo = movieDetailInfo(movieDetail);
  const $movieDetailInfo = $("#modal-container");

  if (!$movieDetailInfo) {
    return false;
  }

  $movieDetailInfo.replaceWith($newMovieDetailInfo);
  return true;
};

export default updateMovieDetailModal;
