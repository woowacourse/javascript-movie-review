import { AppError, handleError } from "../error";
import { renderModal } from "../render/renderModal";

export default function bindClickMovieEvent(element: HTMLElement) {
  element.addEventListener("click", async (event) => {
    try {
      const targetElement = (event.target as HTMLElement).closest<HTMLElement>("[data-movie-id]");
      const movieIdStr = targetElement?.dataset.movieId;

      if (!movieIdStr) throw new AppError("영화 ID를 찾을 수 없습니다.");

      const movieId = Number(movieIdStr);

      if (Number.isNaN(movieId)) throw new AppError("영화 ID가 유효하지 않습니다.");

      await renderModal(movieId);
    } catch (error) {
      await handleError(error);
    }
  })
}