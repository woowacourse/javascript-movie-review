import { MovieDetailInfo } from "../../../types/movieApiType";
import Modal from "../../components/Modal";
import ModalSkeleton from "../../components/ModalSkeleton";
import { DEFAULT_BACK_DROP_URL } from "../../constants/movieApi";
import { movieRatingService } from "./movieRatingService";
import { movieService } from "./movieService";

const $modalContainer = document.querySelector(".modal-container");

const renderSkeleton = () => {
  if ($modalContainer) {
    $modalContainer.innerHTML = "";
    $modalContainer.appendChild(ModalSkeleton());
  }
};

export const movieDetailRenderer = async () => {
  renderSkeleton();

  const {
    backdrop_path,
    genres,
    id,
    overview,
    release_date,
    title,
    vote_average,
  }: MovieDetailInfo = await movieService.getMovieDetailById();

  const img = new Image();
  img.src = DEFAULT_BACK_DROP_URL + backdrop_path;
  img.alt = "영화 포스터 이미지";

  const localStorageMovieRate = movieRatingService.getRatingById(Number(id));

  const $modal = Modal({
    id,
    backdrop_path,
    title,
    release_year: Number(release_date.split("-")[0]),
    genres: genres.map((genre) => genre.name),
    vote_average,
    overview,
    rate_number: localStorageMovieRate!,
  });

  img.onload = () => {
    if ($modalContainer) {
      $modalContainer.innerHTML = "";
      $modalContainer.appendChild($modal);
    }
  };
};
