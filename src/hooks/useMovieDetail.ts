import { $ } from "../utils/domHelper";
import useGetMovieDetail from "../apis/movies/useGetMovieDetail";
import {
  setSelectedMovieId,
  setMovieDetail,
  setIsOpenModal,
  isOpenModal,
} from "../store/store";

const useMovieDetail = () => {
  const { fetchMovieDetail } = useGetMovieDetail();

  const handleMovieItemClick = async (movieId: string) => {
    if (!movieId) return;

    setSelectedMovieId(movieId);

    if (isOpenModal) {
      setIsOpenModal(false);
      const modalBg = $(".modal-background");
      if (!modalBg) return;

      modalBg.classList.remove("active");

      setTimeout(async () => {
        await fetchAndDisplayMovieDetail(movieId);
      }, 300);
      return;
    }

    await fetchAndDisplayMovieDetail(movieId);
  };

  const fetchAndDisplayMovieDetail = async (movieId: string) => {
    const detail = await fetchMovieDetail(movieId);
    if (!detail) return;

    setMovieDetail(detail);
    setIsOpenModal(true);
  };

  return {
    handleMovieItemClick,
    fetchAndDisplayMovieDetail,
  };
};

export default useMovieDetail;
