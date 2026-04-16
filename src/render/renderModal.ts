import { fetchMovieDetail } from "../api";
import { MovieDetail } from "../type";
import renderMyRatingSelector from "./renderMyRatingSelector";

function createModalElement(movieDetail: MovieDetail) {
  const dialogElement = document.createElement("dialog");
  dialogElement.classList.add("modal");
  dialogElement.dataset.movieId = movieDetail.id.toString();

  dialogElement.insertAdjacentHTML('afterbegin', /* html */`
    <form method="dialog">
      <button class="modal-close-button">
        <img src="${import.meta.env.BASE_URL}svg/x.svg" alt="close button" />
      </button>
    </form>
    <div class="modal-body">
      <div class="modal-movie-poster">
      </div>
      <div class="modal-movie-content">
        <div class="modal-movie-header">
          <p class="modal-movie-title"></p>
          <p class="modal-movie-info"></p>
          <p class="modal-movie-rate">
            <span>평균</span>
            <span>
              <img src="${import.meta.env.BASE_URL}images/star_filled.png" alt="filled star" class="star" />
              <span class="modal-movie-rate-value"></span>
            </span>
          </p>
        </div>
        <div class="modal-movie-my-rating">
          <h3 class="modal-movie-content-title">내 평점</h3>
          <div class="modal-movie-my-rating-body">
          </div>
        </div>
        <div class="modal-movie-plot">
          <h3 class="modal-movie-content-title">줄거리</h3>
          <div class="modal-movie-plot-body"></div>
        </div>
      </div>
    </div>
  `)

  const posterElement = document.createElement('img');
  posterElement.src = `${import.meta.env.VITE_IMAGE_BASE_URL}/w400${movieDetail.poster_path}`;
  posterElement.onerror = () => {
    posterElement.src = `${import.meta.env.BASE_URL}images/default_movie_image.png`;
  };
  posterElement.alt = movieDetail.title;

  dialogElement.querySelector('.modal-movie-poster')?.append(posterElement);

  if (dialogElement.querySelector('.modal-movie-title')) {
    dialogElement.querySelector('.modal-movie-title')!.textContent = movieDetail.title;
  }

  if (dialogElement.querySelector('.modal-movie-info')) {
    dialogElement.querySelector('.modal-movie-info')!.textContent = `${movieDetail.release_date.split("-")[0]} · ${movieDetail.genres.map(genre => genre.name).join(", ")}`;
  }

  if (dialogElement.querySelector('.modal-movie-rate-value')) {
    dialogElement.querySelector('.modal-movie-rate-value')!.textContent = movieDetail.vote_average.toFixed(1);
  }

  if (dialogElement.querySelector('.modal-movie-plot-body')) {
    dialogElement.querySelector('.modal-movie-plot-body')!.textContent = movieDetail.overview;
  }

  return dialogElement
}

function createSpinnerElement() {
  const divElement = document.createElement("div");
  divElement.classList.add("spinner-overlay");
  divElement.id = "movie-loading-spinner";
  divElement.insertAdjacentHTML('beforeend', /* html */`
    <div class="spinner"></div>
  `);

  return divElement;
}

function removeSpinnerElement() {
  document.getElementById("movie-loading-spinner")?.remove();
}

let isModalLoading = false;

export async function renderModal(movieId: number) {
  if (isModalLoading) return;
  isModalLoading = true;

  try {
    document.querySelector(".modal")?.remove();

    document.body.insertAdjacentElement("beforeend", createSpinnerElement());

    const response = await fetchMovieDetail(movieId);

    const dialogElement = createModalElement(response);

    document.querySelector('#app')?.insertAdjacentElement("beforeend", dialogElement);

    await renderMyRatingSelector(".modal-movie-my-rating-body", movieId);

    dialogElement.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        dialogElement.close();
      }
    });

    dialogElement.showModal();
  } finally {
    removeSpinnerElement();
    isModalLoading = false;
  }
}