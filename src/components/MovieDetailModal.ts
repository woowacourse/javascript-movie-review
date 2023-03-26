import { DetailInfoType } from "../@types/movieType";

const MovieDetailModal = (movieDetailData: DetailInfoType) => {
  const { title, posterPath, voteAverage, genres, overview } = movieDetailData

  const create = () => {
    return `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
          <section class="modal-header">
            <div class="modal-title">${title}</div>
            <button class="modal-close">X</button>
          </section>
          <section class="modal-info-container">
            <div class="modal-poster">
              <img
                class="skeleton"
                src="https://image.tmdb.org/t/p/w220_and_h330_face/${posterPath}"
              />
            </div>
            <div class="modal-info">
              <div class="modal-genre-rating-container">
                <span class="modal-genre">${genres}</span>
                <span class="modal-rating">
                  <img src="./star_filled.png" />
                  ${voteAverage}
                </span>
              </div>
              <p class="modal-description">
                ${overview}
              </p>
            </div>
          </section>
        </div>
    `;
  };

  const render = () => {
    const movieDetailModal = document.createElement("dialog");
    movieDetailModal.innerHTML = create();

    document.querySelector("main")?.appendChild(movieDetailModal);
    movieDetailModal.showModal();
  };

  const bindEvent = () => {
    const movieDetailModal = document.querySelector("dialog");
    document.querySelector(".modal-close")?.addEventListener('click', () => {
      movieDetailModal?.close();
    })
  }
  render();
  bindEvent();
}

export default MovieDetailModal;
