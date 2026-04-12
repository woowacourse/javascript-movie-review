import { handleError } from "../error";
import { renderModal } from "../render/renderModal";

export default function bindClickMovieEvent(element: HTMLElement) {
  element.addEventListener("click", async (event) => {
    try {
      const targetElement = (event.target as HTMLElement).closest("[data-movie-id]");

      if (targetElement) {
        const movieIdStr = (targetElement as HTMLElement).dataset.movieId;
        const movieId = Number(movieIdStr);

        if (!movieId) throw new Error("영화 ID를 찾을 수 없습니다.")

        await renderModal(movieId);
      }
    } catch (error) {
      await handleError(error);
    }
  })
}