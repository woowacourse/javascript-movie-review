import("./modal.css");

export const modal = ({
  title,
  poster_path,
  //   genre_ids,
  overview,
  vote_average,
}) => {
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
            2024 · 모험, 애니메이션, 코미디, 드라마, 가족
          </p>
          <p class="rate">
            <img src="./star_filled.png" class="star" /><span
              >${vote_average}</span
            >
          </p>
          <hr />
          <p class="detail">
            ${overview}
          </p>
        </div>
      </div>
    </div>
  </div>`;
};
