import { MovieItemMount } from "../MovieList/MovieItem";

export function DetailModalRender(movie) {
  if (!movie) return "";

  return /* html */ `
    <div class="modal-background active" id="modalBackground">
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="https://image.tmdb.org/t/p/original${
              movie.poster_path
            }" alt="${movie.title}" />
          </div>
          <div class="modal-description">
            <h2>${movie.title}</h2>
            <p class="category">
              ${movie.release_date} · ${
    movie.genres ? movie.genres.map((g) => g.name).join(", ") : ""
  }
            </p>
            <div class="rate">
              <span class="rate__title">평균</span>
              <div class="rate__bar">
                <img src="./images/star_filled.png" class="star" />
                <span>${movie.vote_average}</span>
              </div>
            </div>
            <hr />
            <div class="score">
              <h3 >내 별점</h3>
              <div class="score__container">
                <div class="score__stars">
                  <img src="./images/star_filled.png" class="star" />
                  <img src="./images/star_filled.png" class="star" />
                  <img src="./images/star_filled.png" class="star" />
                  <img src="./images/star_filled.png" class="star" />
                  <img src="./images/star_empty.png" class="star" />
                </div>
                <div class="score__description">
                  <span class="score__description--text">명작이예요</span>
                  <span class="score__description--score">(8/10)</span>
                </div>
              </div>
              <div>  
              <hr/>
              <div class="detail">
                <h3>줄거리</h3>
                ${movie.overview}
              </div>
          </div>
        </div>
      </div>
    </div>
    `;
}

export function DetailModalMount() {
  const modalBackground = document.getElementById("modalBackground");
  if (!modalBackground) return;

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modalBackground.remove();
    });
  }

  modalBackground.addEventListener("click", (event) => {
    if (event.target === modalBackground) {
      modalBackground.remove();
    }
  });

  const escHandler = (event) => {
    if (event.key === "Escape") {
      modalBackground.remove();
      window.removeEventListener("keydown", escHandler);
    }
  };
  window.addEventListener("keydown", escHandler);
}
