import type { Movie } from "./api";
import starEmptyImg from "./images/star_empty.png";
import noImagePlanetImg from "./images/no_image_planet.png";
import screamingPlanetImg from "./images/screaming_planet.svg";
import planetAndStarImg from "./images/planet_and_star.png";

const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

const Component = {
  movie(movieData: Pick<Movie, "poster_path" | "title" | "vote_average">) {
    const { poster_path, title, vote_average } = movieData;
    const src = poster_path ? `${IMAGE_PATH}/${poster_path}` : noImagePlanetImg;
    return `
    <li>
      <div class="item">
      <img
      class="thumbnail"
      src="${src}"
      alt="${title}"
      />
        <div class="item-desc">
          <p class="rate">
            <img src="${starEmptyImg}" class="star" /><span>${vote_average.toFixed(1)}</span>
            </p>
            <strong>${title}</strong>
        </div>
      </div>
    </li>
  `;
  },

  movieSkeleton() {
    return `
    <li class="skeleton">
      <div class="item">
        <div class="thumbnail skeleton-box"></div>
        <div class="item-desc">
          <p class="rate">
            <span class="skeleton-box skeleton-rate"></span>
          </p>
          <span class="skeleton-box skeleton-title"></span>
        </div>
      </div>
    </li>
  `;
  },

  movieBanner({
    title,
    vote_average,
    poster_path,
  }: Pick<Movie, "title" | "vote_average" | "poster_path">) {
    return `
      <div class="top-rated-movie" style="background-image: url('${IMAGE_PATH}/${poster_path}')">
        <div class="overlay" aria-hidden="true"></div>
          <div class="container">
            <div class="rate">
              <img src="${starEmptyImg}" class="star" />
              <span class="rate-value">${vote_average.toFixed(1)}</span>
            </div>
            <div class="title">${title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    `;
  },

  emptyResult() {
    return `
      <div class="notice-box">
        <img src="${screamingPlanetImg}">
        <p class="notice-text">검색 결과가 없습니다.</p>
      </div>
      `;
  },

  movieDetail() {
    return `
      <div class="modal-background active" id="modalBackground">
        <div class="modal">
          <button class="close-modal" id="closeModal">
            <img src="src/images/modal_button_close.png" alt="close modal"/>
          </button>
          <div class="modal-container">
            <div class="modal-image">
              <img
                src="https://image.tmdb.org/t/p/original//pmemGuhr450DK8GiTT44mgwWCP7.jpg"
                alt="movie poster"
              />
            </div>
            <div class="modal-description">
              <h2>인사이드 아웃 2</h2>
              <p class="category">
                2024 · 모험, 애니메이션, 코미디, 드라마, 가족
              </p>
              <p class="rate">
                <img src="src/images/star_filled.png" class="star" alt="vote average" /><span
                  >7.7</span
                >
              </p>
              <hr />
              <p class="detail">
                13살이 된 라일리의 행복을 위해 매일 바쁘게 머릿속 감정 컨트롤
                본부를 운영하는 ‘기쁨’, ‘슬픔’, ‘버럭’, ‘까칠’, ‘소심’. 그러던
                어느 날, 낯선 감정인 ‘불안’, ‘당황’, ‘따분’, ‘부럽’이가 본부에
                등장하고, 언제나 최악의 상황을 대비하며 제멋대로인 ‘불안’이와 기존
                감정들은 계속 충돌한다. 결국 새로운 감정들에 의해 본부에서
                쫓겨나게 된 기존 감정들은 다시 본부로 돌아가기 위해 위험천만한
                모험을 시작하는데…
              </p>
            </div>
          </div>
        </div>
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
};

export default Component;
