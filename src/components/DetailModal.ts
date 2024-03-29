import { apiClient, rateDataStateStore } from "../model";
import { Movie, MovieDetail } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import CloseButton, { handleCloseModal } from "./CloseButton";
import MovieGenres from "./MovieGenres";
import MovieImg from "./MovieImg";
import MovieOverview from "./MovieOverview";
import MovieScore from "./MovieScore";
import MovieTitle from "./MovieTitle";
import StarRate from "./StarRate";

const $main = document.querySelector("main");

const ModalRate = (movie: MovieDetail) => {
  const rate = rateDataStateStore.getOneRate(movie.id);
  if (!rate) {
    return StarRate({ movieId: movie.id, rate: 0 }, "modal-rate");
  }
  return StarRate(rate, "modal-rate");
};

const InfoTopContainer = (movie: MovieDetail) => {
  const $infoTop = createElementWithAttribute("div", {
    class: "detail-info-top",
  });
  $infoTop.appendChild(MovieGenres(movie.genres, "modal-genres"));
  $infoTop.appendChild(MovieScore(movie.vote_average, "modal-score"));

  return $infoTop;
};

const ModalInfoContainer = (movie: MovieDetail) => {
  const $infoContainer = createElementWithAttribute("div", {
    class: "modal-info-container",
  });
  const $info = createElementWithAttribute("div", { class: "detail-info" });

  $info.appendChild(InfoTopContainer(movie));
  $info.appendChild(MovieOverview(movie.overview, "modal-overview"));
  $infoContainer.appendChild($info);
  $infoContainer.appendChild(ModalRate(movie));

  return $infoContainer;
};

const ModalSection = (movie: MovieDetail) => {
  const $modalSection = createElementWithAttribute("section", {
    class: "modal-section",
  });

  $modalSection.appendChild(
    MovieImg(movie.poster_path, movie.title, "modal-thumbnail"),
  );
  $modalSection.appendChild(ModalInfoContainer(movie));

  return $modalSection;
};

const ModalHeader = (movie: MovieDetail) => {
  const $modalHeader = createElementWithAttribute("div", {
    class: "modal-header",
  });

  $modalHeader.appendChild(MovieTitle(movie.title, "modal-title"));
  $modalHeader.appendChild(CloseButton());

  return $modalHeader;
};

const ModalContainer = async (movieId: number) => {
  const movieDetail: MovieDetail =
    await apiClient.getOneMovieDetailData(movieId);
  const $modalContainer = createElementWithAttribute("div", {
    class: "modal-container",
  });
  $modalContainer.appendChild(ModalHeader(movieDetail));
  $modalContainer.appendChild(ModalSection(movieDetail));
  return $modalContainer;
};

const closeModal = () => {
  const $modalBackdrop = document.querySelector(".modal-backdrop");
  $modalBackdrop?.addEventListener("click", () => {
    handleCloseModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  });
};

const DetailModal = async (movie: Movie) => {
  document.body.style.overflow = "hidden";
  const $modal = createElementWithAttribute("div", { class: "detail-modal" });
  const $modalBackdrop = createElementWithAttribute("div", {
    class: "modal-backdrop",
  });

  $modal.appendChild($modalBackdrop);
  $modal.appendChild(await ModalContainer(movie.id));
  $main?.appendChild($modal);

  closeModal();
};
export default DetailModal;
