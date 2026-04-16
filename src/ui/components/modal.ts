import { MovieDetail } from "../../apis/dtos";
import planetAndStarImg from "../../images/planet_and_star.png";

const ModalComponent = {
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
    const { title, posterPath, voteAverage, genres, releaseYear, overview } =
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
                ${overview}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
    `;
  },
};

export default ModalComponent;
