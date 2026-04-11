import { renderModal } from "../render/renderModal";

export default function bindClickTopRatedMovieEvent() {
  const topRatedMovieElement = document.querySelector<HTMLDivElement>(".top-rated-movie");
  topRatedMovieElement?.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLButtonElement)) return

    const movieId = topRatedMovieElement.dataset.movieId;

    if (!movieId) throw new Error("영화 ID를 찾을 수 없습니다.")

    renderModal(Number(movieId));
  })
}