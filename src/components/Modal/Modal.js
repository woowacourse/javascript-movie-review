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
          <div class="movie-title">${title}</div>
          <p class="category">
            ${release_date.slice(0, 4)} · ${genreNames}
          </p>
          <p class="rate">
            <img src="./star_filled.png" class="star" />
            <span>${vote_average.toFixed(1)}</span>
          </p>
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
          <div class="caption-title"><strong>줄거리</strong></div>
          <p class="detail">
            ${overview}
          </p>
        </div>
      </div>
    </div>
  </div>`;
};
