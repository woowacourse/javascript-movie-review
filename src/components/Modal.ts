import imageUrl from "../utils/imageUrl";
import createElement from "./utils/createElement";

const starMessage = {
  1: "최악이예요",
  2: "별로예요",
  3: "보통이에요",
  4: "재미있어요",
  5: "명작이에요",
};

const Modal = (movieDetails: MovieDetails) => {
  const year = extractReleaseYear(movieDetails);
  const genres = extractGenres(movieDetails);
  const myRate = Number(localStorage.getItem(String(movieDetails.id))) || 0;

  const $div = createElement({
    tag: "div",
    classNames: ["modal-background", "active"],
    id: "modalBackground",
  });

  const renderStars = (rate: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const starValue = i + 1;
      const imgSrc =
        rate >= starValue
          ? "./images/star_filled.png"
          : "./images/star_empty.png";
      return `<img src="${imgSrc}" class="star" data-star-value="${starValue}" />`;
    }).join("");
  };

  const render = (rate: number) => {
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
            <div class="my-rate">
              <p>내 별점</p>
              ${renderStars(rate)}
              <span>${starMessage[rate]}</span>
              <span>(${rate * 2}/10)</span>
            </div>
            <hr />
            <p class="detail">
              <p><strong>줄거리</strong></p>
              ${movieDetails.overview}
            </p>
          </div>
        </div>
      </div>
    `;
  };

  const bindStarEvents = () => {
    bindModalEvents();
    const $stars = $div.querySelectorAll<HTMLImageElement>(".my-rate .star");
    $stars.forEach(($star) => {
      $star.addEventListener("click", () => {
        const newRate = Number($star.dataset.starValue);
        localStorage.setItem(String(movieDetails.id), String(newRate));
        render(newRate);
        bindStarEvents();
      });
    });
  };

  const handleClose = () => {
    $div.remove();
  };

  const bindModalEvents = () => {
    $div.querySelector("#closeModal")?.addEventListener("click", handleClose);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") handleClose();
    });
  };

  render(myRate);
  bindStarEvents();

  return $div;
};

export default Modal;

interface MovieDetails {
  id: number;
  genres: { name: string }[];
  release_date: string;
  poster_path: string;
  title: string;
  vote_average: number;
  overview: string;
}

function extractGenres(movieDetails: MovieDetails) {
  return movieDetails.genres.map((genre) => genre.name).join(", ");
}

function extractReleaseYear(movieDetails: MovieDetails) {
  return movieDetails.release_date.split("-")[0];
}
