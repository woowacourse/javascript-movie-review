import { MovieItemType, storedDetailMovieItemType } from "../../types/movieResultType";
import createDOMElement from "../../util/createDomElement";
import MyStarRatingComponent from "./MyStarRatingComponent";

const ModalDescriptionComponent = (movieItem: MovieItemType | storedDetailMovieItemType) => {
  return createDOMElement({
    tag: "div",
    className: "modal-description",
    children: [
      // 첫 번째 섹션
      MovieInfoSectionComponent(movieItem),
      // 두 번째 섹션 (내 별점)
      MyStarRatingSectionComponent(movieItem),
      // 세 번째 섹션 (줄거리)
      OverviewSectionComponent(movieItem.overview),
    ],
  });
};

export default ModalDescriptionComponent;

const MovieInfoSectionComponent = (movieItem: MovieItemType | storedDetailMovieItemType) => {
  return createDOMElement({
    tag: "div",
    className: "description-section description-first-section",
    children: [
      createDOMElement({
        tag: "h2",
        className: "movie-title",
        textContent: movieItem.title,
      }),
      createDOMElement({
        tag: "p",
        className: "category",
        textContent: "2024 · 모험, 애니메이션, 코미디, 드라마, 가족",
      }),
      createDOMElement({
        tag: "div",
        className: "rate",
        children: [
          createDOMElement({
            tag: "span",
            className: "average",
            textContent: "평균",
          }),
          createDOMElement({
            tag: "div",
            className: "rate-star",
            children: [
              createDOMElement({
                tag: "img",
                className: "star",
                src: "./images/star_filled.png",
              }),
              createDOMElement({
                tag: "span",
                className: "star-description",
                textContent: Number(movieItem.vote_average).toFixed(2),
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const MyStarRatingSectionComponent = (movieItem: MovieItemType | storedDetailMovieItemType) => {
  return createDOMElement({
    tag: "div",
    className: "description-section description-second-section",
    children: [
      createDOMElement({
        tag: "span",
        className: "description-title",
        textContent: "내 별점",
      }),
      MyStarRatingComponent("starScore" in movieItem ? movieItem.starScore : 0),
    ],
  });
};

const OverviewSectionComponent = (overview: string) => {
  return createDOMElement({
    tag: "div",
    className: "description-section description-third-section",
    children: [
      createDOMElement({
        tag: "span",
        className: "description-title",
        textContent: "줄거리",
      }),
      createDOMElement({
        tag: "p",
        className: "detail",
        textContent: overview ? overview : "줄거리가 없습니다.",
      }),
    ],
  });
};
