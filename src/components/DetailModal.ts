/* eslint-disable max-lines-per-function */
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

const ModalInfoContainer = (movie: MovieDetail) => {
  const $infoContainer = createElementWithAttribute("div", {
    class: "modal-info-container",
  });
  const $info = createElementWithAttribute("div", {});
  const $infoTop = createElementWithAttribute("div", {
    class: "detail-info-top",
  });
  $infoTop.appendChild(MovieGenres(movie.genres, "modal-genres"));
  $infoTop.appendChild(MovieScore(movie.vote_average, "modal-score"));

  $info.appendChild($infoTop);
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

const ModalContainer = (movie: MovieDetail) => {
  const $modalContainer = createElementWithAttribute("div", {
    class: "modal-container",
  });
  $modalContainer.appendChild(ModalHeader(movie));
  $modalContainer.appendChild(ModalSection(movie));
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
  const movieDetail: MovieDetail = await apiClient.getOneMovieDetailData(
    movie.id,
  );

  document.body.style.overflow = "hidden";
  const $modal = createElementWithAttribute("div", { class: "detail-modal" });
  const $modalBackdrop = createElementWithAttribute("div", {
    class: "modal-backdrop",
  });

  $modal.appendChild($modalBackdrop);
  $modal.appendChild(ModalContainer(movieDetail));

  $main?.appendChild($modal);

  closeModal();
};
export default DetailModal;
