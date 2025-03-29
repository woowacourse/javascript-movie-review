import("./modal.css");

export const Modal = ({
  title,
  poster_path,
  release_date,
  genres,
  overview,
  vote_average,
}) => {
  const genreNames = genres.map((genre) => genre.name).join(", ");
  const defaultOverview = "등록된 줄거리 정보가 없습니다.🥲";

  return `    <div class="modal-background active" id="modalBackground">
    <div class="modal">
      <button class="close-modal" id="closeModal">
        <img src="./modal_button_close.png" />
      </button>
      <div class="modal-container">
        <div class="modal-image">
          <img
            src="https://image.tmdb.org/t/p/original/${poster_path}"
          />
        </div>
        <div class="modal-description">
          <div class="movie-description">
            <div class="movie-title">${title}</div>
              <p class="category">
                ${release_date.slice(0, 4)} · ${genreNames}
              </p>
              <div class="rate">
                <strong>평균</strong>
                <img src="./star_filled.png" class="star" />
                <div class="average_rate">${vote_average.toFixed(1)}</div>
              </div>
          </div>
            
          <hr />
          <div class="rating">
            <div class="caption-title"><strong>내 별점</strong></div>
            <div class="user_rate">
              <img src="./star_empty.png" class="rate-star" />
              <img src="./star_empty.png" class="rate-star" />
              <img src="./star_empty.png" class="rate-star" />
              <img src="./star_empty.png" class="rate-star" />
              <img src="./star_empty.png" class="rate-star" />
            </div>
          </div>
          <hr />
          <div class="movie-detail">
            <div class="caption-title"><strong>줄거리</strong></div>
            <div class="detail">${overview ? overview : defaultOverview}</div>
            </div>
        </div>
      </div>
    </div>
  </div>`;
};
