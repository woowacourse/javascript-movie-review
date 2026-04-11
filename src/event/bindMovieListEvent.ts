import { renderModal } from "../render/renderModal";

export default function bindMovieListEvent() {
  const listElement = document.querySelector<HTMLUListElement>(".thumbnail-list");
  listElement?.addEventListener("click", (event) => {
    const targetElement = (event.target as HTMLElement).closest(".item");

    if (targetElement) {
      const movieId = (targetElement as HTMLElement).dataset.movieId;

      if (!movieId) throw new Error("영화 ID를 찾을 수 없습니다.")
      renderModal(movieId);
    }
  })
}