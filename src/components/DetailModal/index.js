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
            <p class="rate">
              <img src="./images/star_filled.png" class="star" /><span>${
                movie.vote_average
              }</span>
            </p>
            <hr />
            <p class="detail">
              ${movie.overview}
            </p>
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

  const escHandler = (event) => {
    if (event.key === "Escape") {
      modalBackground.remove();
      window.removeEventListener("keydown", escHandler);
    }
  };
  window.addEventListener("keydown", escHandler);
}
