import { getMovieDetails } from "../../../features/movie/api/getMovieDetails";
import ErrorModal from "../components/ErrorModal";
import MovieDetailModal from "../components/MovieDetailModal";

export const movieDetailModalHandler = () => {
  const $movieCardButton = document.querySelectorAll(".movie-card-button");
  $movieCardButton.forEach((button) => {
    button.addEventListener("click", async (e) => {
      const target = e.target as HTMLElement;
      const movieId = target.closest(".movie-card-button")?.id;

      try {
        const {
          id,
          title,
          poster_path,
          release_date,
          genres,
          vote_average,
          overview,
        } = await getMovieDetails(Number(movieId));
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
          ErrorModal("영화 상세 정보를 불러오는데 실패하였습니다.");
        }
      }
    });
  });
};
