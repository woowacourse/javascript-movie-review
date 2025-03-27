import getMovieDetail from "../../apis/getMovieDetail";
import { handleModal } from "../../components/Modal/Modal";
import { MOVIE_ITEM_CLICK } from "../../components/MovieListBox/MovieList/MovieItem/MovieItem";

export interface MovieItemClickEvent extends CustomEvent {
  detail: {
    movieId: number;
  };
}

export const handleMovieDetailEvent = (event: MovieItemClickEvent) => {
  const { movieId } = event.detail;

  getMovieDetail(movieId)
    .then((movieDetail) => {
      handleModal.updateModalContent(movieDetail);
    })
    .catch((error) => {
      console.error("영화 상세 정보를 가져오는 중 오류 발생:", error);
    });
};

const registerMovieDetailEventListener = () => {
  document.addEventListener(
    MOVIE_ITEM_CLICK,
    handleMovieDetailEvent as EventListener
  );
};

export default registerMovieDetailEventListener;
