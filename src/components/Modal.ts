import imageUrl from "../utils/imageUrl";
import createElement from "./utils/createElement";

const Modal = (movieDetails: MovieDetails) => {
  const year = extractReleaseYear(movieDetails);
  const genres = extractGenres(movieDetails);

  const $div = createElement({
    tag: "div",
    classNames: ["modal-background", "active"],
    id: "modalBackground",
  });

  $div.innerHTML = `
          <div class="modal">
            <button class="close-modal" id="closeModal">
              <img src="./images/modal_button_close.png" />
            </button>
            <div class="modal-container">
              <div class="modal-image">
                <img src="${imageUrl(movieDetails.poster_path)}" />
              </div>
              <div class="modal-description">
                <h2>${movieDetails.title}</h2>
                <p class="category">${year} · ${genres}</p>
                <p class="rate">
                  <span>평균</span>
                  <img src="./images/star_filled.png" class="star" />
                  <span>${movieDetails.vote_average.toFixed(1)}</span>
                </p>
                <hr />
                <p class="detail">
                    <p><strong>줄거리</strong></p>
                    ${movieDetails.overview}
                </p>
              </div>
            </div>
          </div>
      `;

  const handleClose = () => {
    $div.remove();
  };

  const $closeModal = $div.querySelector("#closeModal");
  $closeModal?.addEventListener("click", () => {
    handleClose();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      handleClose();
    }
  });

  return $div;
};

export default Modal;

interface MovieDetails {
  genres: { name: string }[];
  release_date: string;
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
}

function extractGenres(movieDetails: MovieDetails) {
  const genres = movieDetails.genres.map((genre) => genre.name);
  return genres.join(", ");
}

function extractReleaseYear(movieDetails: MovieDetails) {
  return movieDetails.release_date.split("-")[0];
}
