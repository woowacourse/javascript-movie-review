import { getMovieDetails } from "../../movie/api/getMovieDetails";
import ErrorModal from "../../../shared/ui/components/ErrorModal";
import MovieDetailModal from "./components/MovieDetailModal";

export const bannerButtonHandler = () => {
  const $bannerButton = document.querySelector(".banner-button");

  $bannerButton?.addEventListener("click", async () => {
    const $firstMovieCardButton = document.querySelector(
      ".movie-card-button"
    ) as HTMLElement;
    const firstMovieCardId = $firstMovieCardButton.id;

    try {
      MovieDetailModal(await getMovieDetails(Number(firstMovieCardId)));
    } catch (error) {
      if (error instanceof Error) {
        ErrorModal("영화 상세 정보를 불러오는데 실패하였습니다.");
      }
    }
  });
};
