import { fetchMovieDetail } from "../api/movieApi";
import { Modal } from "../components/modal/modal";

export const createOnMovieClick = (modal: Modal) => {
  return async (id: number) => {
    try {
      const detail = await fetchMovieDetail(id);
      modal.open({
        id: detail.id,
        title: detail.title,
        posterPath: detail.poster_path,
        releaseYear: detail.release_date.slice(0, 4),
        genres: detail.genres.map((g) => g.name),
        rating: detail.vote_average,
        overview: detail.overview,
      });
    } catch (error) {
      alert(`영화 상세 정보를 불러오는 데 실패했습니다. ${error}`);
    }
  };
};
