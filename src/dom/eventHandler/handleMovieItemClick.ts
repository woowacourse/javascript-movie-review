import { getMovieDetail } from "../../apis/movie/api.ts";
import { renderMovieModal } from "../components/MovieModal.ts";

export const handleMovieItemClick = async (e: MouseEvent) => {
  if (e.target instanceof HTMLElement) {
    const li = e.target.closest("li");
    if (!li) return;

    const movieId = li.id;

    if (movieId == null) {
      alert("영화 정보를 불러올 수 없습니다.");
      return;
    }

    try {
      const movieDetail = await getMovieDetail({
        movieId: Number(movieId),
        language: "ko-KR",
      });

      renderMovieModal(document.body, movieDetail);
    } catch {
      alert("영화 정보를 불러올 수 없습니다.");
    }
  }
};
