import type { AppElements } from "../../types/dom";
import type { MovieDetail } from "../../types/movie";
import type { MovieUserRating } from "../../types/movieRating";

import type { MovieRatingRepository } from "../repositories/MovieRatingRepository";
import { applyMovieUserRating } from "./MovieRatingService";
import {
  clearMovieDetailModal,
  closeMovieDetailModal,
  openMovieDetailModal,
  renderMovieDetail,
} from "./MovieDetailModalService";

interface MovieDetailControllerDependencies {
  elements: AppElements;
  loadMovieDetail: (movieId: number) => Promise<MovieDetail>;
  movieRatingRepository: MovieRatingRepository;
  onError: (error: unknown) => void;
  onMovieRated: (movieId: number, userRating: MovieUserRating) => void;
}

export const createMovieDetailController = ({
  elements,
  loadMovieDetail,
  movieRatingRepository,
  onError,
  onMovieRated,
}: MovieDetailControllerDependencies) => {
  let latestRequestId = 0;
  let currentMovieDetailId: number | null;
  let currentMovieDetail: MovieDetail | null;

  //모달 닫거나 여는 요청 있을 때마다 실행해서 이전에 가지고 있던 정보를 초기화
  const resetCurrentMovieDetailState = () => {
    latestRequestId += 1;
    currentMovieDetailId = null;
    currentMovieDetail = null;
  };

  const loadMovieDetailWithUserRating = async (movieId: number) => {
    // Promise.all로 fetch와 기존 별점 조회를 병렬 작업
    const [movieDetail, userRating] = await Promise.all([loadMovieDetail(movieId), movieRatingRepository.get(movieId)]);

    return applyMovieUserRating(movieDetail, userRating);
  };

  const openById = async (movieId: number) => {
    resetCurrentMovieDetailState();
    const requestId = latestRequestId;
    clearMovieDetailModal(elements);

    try {
      const movieDetail = await loadMovieDetailWithUserRating(movieId);

      if (requestId !== latestRequestId) {
        return;
      }

      //변수 저장 후 모달 띄우기
      currentMovieDetailId = movieId;
      currentMovieDetail = movieDetail;
      renderMovieDetail(movieDetail, elements);
      openMovieDetailModal(elements);
    } catch (error) {
      if (requestId !== latestRequestId) {
        return;
      }

      close();
      onError(error);
    }
  };

  const updateUserRating = async (userRating: MovieUserRating) => {
    if (!currentMovieDetailId || !currentMovieDetail) {
      return; // 열려있는 영화가 없으면 무시
    }

    //로컬 스토리지에 먼저 별점 저장
    await movieRatingRepository.set(currentMovieDetailId, userRating);

    currentMovieDetail = applyMovieUserRating(currentMovieDetail, userRating);
    onMovieRated(currentMovieDetailId, userRating);
    renderMovieDetail(currentMovieDetail, elements);
  };

  const close = () => {
    closeMovieDetailModal(elements);
    resetCurrentMovieDetailState();
  };

  const syncClosedState = () => {
    resetCurrentMovieDetailState();
  };

  return {
    openById,
    updateUserRating,
    close,
    syncClosedState,
  };
};
