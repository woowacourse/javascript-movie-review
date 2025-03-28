import { getMovieDetails } from "../../../features/movie/api/getMovieDetails";
import ErrorPage from "../components/ErrorPage";
import MovieDetailModal from "../components/MovieDetailModal";

export const bannerButtonHandler = () => {
  const $bannerButton = document.querySelector(".banner-button");

  $bannerButton?.addEventListener("click", async () => {
    const $firstMovieCardButton = document.querySelector(
      ".movie-card-button"
    ) as HTMLElement;
    const firstMovieCardId = $firstMovieCardButton.id;

    try {
      const {
        id,
        title,
        poster_path,
        release_date,
        genres,
        vote_average,
        overview,
      } = await getMovieDetails(Number(firstMovieCardId));
      const movieDetails = {
        id,
        title,
        poster_path,
        release_date,
        genres,
        vote_average,
        overview,
      };

      MovieDetailModal(movieDetails);
    } catch (error) {
      if (error instanceof Error) {
        ErrorPage("영화 상세 정보를 불러오는데 실패하였습니다.");
      }
    }
  });
};
