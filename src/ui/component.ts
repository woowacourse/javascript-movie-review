import { Movie, MovieDetail } from "../apis/dtos";
import planetAndStarImg from "../images/planet_and_star.png";
import screamingPlanetImg from "../images/screaming_planet.svg";
import starEmptyImg from "../images/star_empty.png";

//TODO: 컴포넌트 요소가 movie 데이터의 형태를 알고 있음. 도메인에 의존적이지 않도록 수정 필요
const Component = {
  movie(movieData: Pick<Movie, "posterPath" | "title" | "voteAverage" | "id">) {
    const { posterPath, title, voteAverage } = movieData;
    return `
    <li class="movie-item" data-movie-id="${movieData.id}">
      <div class="item">
      <img
      class="thumbnail"
      src="${posterPath}"
      alt="${title}"
      />
        <div class="item-desc">
          <p class="rate">
            <img src="${starEmptyImg}" class="star" /><span>${voteAverage.toFixed(1)}</span>
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
    posterPath,
    voteAverage,
  }: Pick<Movie, "title" | "voteAverage" | "posterPath">) {
    return `
      <div class="top-rated-movie" style="background-image: url('${posterPath}')">
        <div class="overlay" aria-hidden="true"></div>
          <div class="container">
            <div class="rate">
              <img src="${starEmptyImg}" class="star" />
              <span class="rate-value">${voteAverage.toFixed(1)}</span>
            </div>
            <div class="title">${title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
      </div>
    `;
  },

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

  movieModalSkeleton() {
    return `
    <div class="modal-background active skeleton">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="src/images/modal_button_close.svg" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <div class="skeleton-box" style="width:100%;height:100%;"></div>
          </div>
          <div class="modal-description">
            <div class="skeleton-box skeleton-title" style="width:60%;height:2rem;margin-bottom:1rem;"></div>
            <section>
              <div class="skeleton-box" style="width:50%;height:1rem;margin-bottom:0.5rem;"></div>
              <div class="skeleton-box" style="width:30%;height:1rem;"></div>
            </section>
            <hr />
            <section>
              <div class="skeleton-box" style="width:100%;height:4rem;"></div>
            </section>
          </div>
        </div>
      </div>
    </div>
    `;
  },

  movieModalError() {
    return `
    <div class="modal-background active">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="src/images/modal_button_close.svg" />
        </button>
        <div class="modal-container" style="justify-content:center;align-items:center;">
          <div class="notice-box">
            <img src="${planetAndStarImg}">
            <span class="notice-text">영화 상세 정보를 불러오는 데 실패했습니다.</span>
          </div>
        </div>
      </div>
    </div>
    `;
  },

  movieModal(movie: MovieDetail, rating: number = 0) {
    const { title, posterPath, voteAverage, genres, releaseYear, tagline } =
      movie;
    return `
    <div class="modal-background active">
    <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="src/images/modal_button_close.svg" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img
              src="${posterPath}"
              alt="${title}"
            />
          </div>
          <div class="modal-description">
            <h2>${title}</h2>
            <section>
              <p class="category">
                ${releaseYear} · ${genres.join(", ")} 
              </p>
              <p class="rate">
                <img src="src/images/star_filled.png" class="star" />
                <span>${voteAverage.toFixed(1)}</span>
              </p>
            </section>
            <hr />
            <section class="my-rating">
        <h3 class="my-rating__heading">내 별점</h3>
        <div class="my-rating__content">
          <div>
          ${Array.from({ length: 5 })
            .map((_, index) => {
              const ratingValue = (index + 1) * 2;
              const starType =
                ratingValue <= rating ? "star_filled.png" : "star_empty.png";
              return `<img src="src/images/${starType}" class="star" data-rating-value="${ratingValue}" />`;
            })
            .join("")}
          </div>
          <span>명작이에요</span>
          <span class="my-rating__point">(${rating}/10)</span>
        </div>
      </section>
            <hr />
            <section>
              <h3>줄거리</h3>
              <p class="detail">
                ${tagline}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    `;
  },
};

export default Component;
