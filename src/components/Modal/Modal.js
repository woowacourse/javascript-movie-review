import("./modal.css");

export const Modal = ({
  title,
  poster_path,
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
          <h2>${title}</h2>
          <p class="category">
            2024 · ${genreNames}
          </p>
          <p class="rate">
            <img src="./star_filled.png" class="star" /><span
              >${vote_average}</span
            >
          </p>
          <hr />
          // 별점 입력
          <p class="detail">
            ${overview}
          </p>
        </div>
      </div>
    </div>
  </div>`;
};
