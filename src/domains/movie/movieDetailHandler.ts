import getMovieDetail from "../../apis/getMovieDetail";
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
      // TODO : 영화 상세 정보 모달 출력
      console.log("영화 상세 정보:", movieDetail);
    })
    .catch((error) => {
      // TODO : 영화 상세 정보 가져오는 중 오류 발생 출력
    });
};

const registerMovieDetailEventListener = () => {
  document.addEventListener(
    MOVIE_ITEM_CLICK,
    handleMovieDetailEvent as EventListener
  );
};

export default registerMovieDetailEventListener;
