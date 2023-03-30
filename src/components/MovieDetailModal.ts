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

    bindEvent(movieDetailModal);
  };

  const bindEvent = (movieDetailModal: HTMLDialogElement) => {
    const onCloseClick = () => {
      movieDetailModal?.close();
      movieDetailModal.removeEventListener('click', onCloseClick);
      movieDetailModal.remove();
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onCloseClick();
        document.removeEventListener('keydown', onKeydown);
      }
    };

    movieDetailModal.querySelector(".modal-close")?.addEventListener('click', onCloseClick);
    movieDetailModal.querySelector(".modal-backdrop")?.addEventListener('click', onCloseClick);
    document.addEventListener('keydown', onKeydown);
  };

  render();
}

export default MovieDetailModal;
