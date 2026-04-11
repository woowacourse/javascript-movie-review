import { fetchMovieDetail, fetchMyRating } from "../api";
import bindSelectRatingEvent from "../event/bindSelectRatingEvent";
import { MovieDetail } from "../type";

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
        <img 
          src="${import.meta.env.VITE_IMAGE_BASE_URL}/w500${movieDetail.poster_path}"
          onerror="this.src='${import.meta.env.BASE_URL}images/default_movie_image.png'"
          alt="${movieDetail.title}"
        />
      </div>
      <div class="modal-movie-content">
        <div class="modal-movie-header">
          <p class="modal-movie-title">${movieDetail.title}</p>
          <p class="modal-movie-info">${movieDetail.release_date.split("-")[0]} · ${movieDetail.genres.map(genre => genre.name).join(", ")}</p>
          <p class="modal-movie-rate">
            <span>평균</span>
            <span>
              <img src="${import.meta.env.BASE_URL}images/star_filled.png" alt="filled star" class="star" />
              <span class="modal-movie-rate-value">${movieDetail.vote_average.toFixed(1)}</span>
            </span>
          </p>
        </div>
        <div class="modal-movie-my-rate">
          <h3 class="modal-movie-content-title">내 평점</h3>
          <div class="modal-movie-my-rate-body">
          </div>
        </div>
        <div class="modal-movie-plot">
          <h3 class="modal-movie-content-title">줄거리</h3>
          <div class="modal-movie-plot-body">${movieDetail.overview}</div>
        </div>
      </div>
    </div>
  `)

  return dialogElement
}

function createMyRateSelectorElement(currentRating?: number) {
  const formElement = document.createElement("div");
  formElement.classList.add("modal-movie-my-rate-form")

  if (currentRating !== undefined) {
    formElement.dataset.rating = currentRating.toString()
  }

  const buttonElements = Array.from({ length: 5 }, (_, index) => {
    const buttonElement = document.createElement("button");
    buttonElement.type = "button";
    buttonElement.classList.add("star-button");
    buttonElement.dataset.rating = String((index + 1) * 2);
    return buttonElement
  })

  formElement.append(...buttonElements);

  return formElement
}

export async function renderModal(movieId: number) {
  document.querySelector(".modal")?.remove();

  // TODO: 비동기를 기다리는 동안 로딩 스피너 표시
  const response = await fetchMovieDetail(movieId);
  const myRating = fetchMyRating(movieId);

  const dialogElement = createModalElement(response);
  const myRateFormElement = createMyRateSelectorElement(myRating);

  document.querySelector('#app')?.insertAdjacentElement("beforeend", dialogElement);
  dialogElement.querySelector(".modal-movie-my-rate-body")?.append(myRateFormElement);

  bindSelectRatingEvent()

  dialogElement.showModal();
}