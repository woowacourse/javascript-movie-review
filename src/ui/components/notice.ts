import planetAndStarImg from "../../images/planet_and_star.png";
import screamingPlanetImg from "../../images/screaming_planet.svg";

const NoticeComponent = {
  emptyResult() {
    return `
      <div class="notice-box empty-result">
        <img src="${screamingPlanetImg}">
        <p class="notice-text">검색 결과가 없습니다.</p>
      </div>
      `;
  },

  error(message: string) {
    return `
      <div class="notice-box">
        <img src="${planetAndStarImg}">
        <span class="notice-text">${message}</span>
      </div>
    `;
  },

  inView() {
    return `
    <div class="load-more-inView"></div>
    `;
  },
};

export default NoticeComponent;
