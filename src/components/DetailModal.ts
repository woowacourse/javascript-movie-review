/* eslint-disable max-lines-per-function */
import { MovieDetail } from "../type/movie";
import { createElementWithAttribute } from "../utils";

import CloseButton from "./CloseButton";
import MovieGenres from "./MovieGenres";
import MovieImg from "./MovieImg";
import MovieOverview from "./MovieOverview";
import MovieScore from "./MovieScore";
import MovieTitle from "./MovieTitle";
import StarRate from "./StarRate";

const movie: MovieDetail = {
  id: 1011985,
  original_title: "Kung Fu Panda 4",
  genres: [
    {
      id: 28,
      name: "액션",
    },
    {
      id: 12,
      name: "모험",
    },
    {
      id: 16,
      name: "애니메이션",
    },
    {
      id: 35,
      name: "코미디",
    },
    {
      id: 10751,
      name: "가족",
    },
  ],
  overview:
    "마침내 내면의 평화… 냉면의 평화…가 찾아왔다고 믿는 용의 전사 ‘포’ 이젠 평화의 계곡의 영적 지도자가 되고, 자신을 대신할 후계자를 찾아야만 한다. “이제 용의 전사는 그만둬야 해요?” 용의 전사로의 모습이 익숙해지고 새로운 성장을 하기보다 지금 이대로가 좋은 ‘포’ 하지만 모든 쿵푸 마스터들의 능력을 그대로 복제하는 강력한 빌런 ‘카멜레온’이 나타나고 그녀를 막기 위해 정체를 알 수 없는 쿵푸 고수 ‘젠’과 함께 모험을 떠나게 되는데… 포는 가장 강력한 빌런과 자기 자신마저 뛰어넘고 진정한 변화를 할 수 있을까?",
  poster_path: "/1ZNOOMmILNUzVYbzG1j7GYb5bEV.jpg",
  release_date: "2024-03-02",
  title: "쿵푸팬더 4",
  vote_average: 6.911,
  vote_count: 157,
};

const ModalInfoContainer = () => {
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
  $infoContainer.appendChild(StarRate(movie.vote_average, "modal-rate"));

  return $infoContainer;
};

const ModalSection = () => {
  const $modalSection = createElementWithAttribute("section", {
    class: "modal-section",
  });

  $modalSection.appendChild(
    MovieImg(movie.poster_path, movie.title, "modal-thumbnail"),
  );
  $modalSection.appendChild(ModalInfoContainer());

  return $modalSection;
};

const ModalHeader = () => {
  const $modalHeader = createElementWithAttribute("div", {
    class: "modal-header",
  });

  $modalHeader.appendChild(MovieTitle(movie.title, "modal-title"));
  $modalHeader.appendChild(CloseButton());

  return $modalHeader;
};

const ModalContainer = () => {
  const $modalContainer = createElementWithAttribute("div", {
    class: "modal-container",
  });
  $modalContainer.appendChild(ModalHeader());
  $modalContainer.appendChild(ModalSection());
  return $modalContainer;
};

const DetailModal = () => {
  const $modal = createElementWithAttribute("div", { class: "detail-modal" });
  const $modalBackdrop = createElementWithAttribute("div", {
    class: "modal-backdrop",
  });

  $modal.appendChild($modalBackdrop);
  $modal.appendChild(ModalContainer());

  return $modal;
};
export default DetailModal;
